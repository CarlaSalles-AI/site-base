import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { portfolioAPI, cloudinaryAPI } from '../../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { toast } from 'sonner';
import { ArrowLeft, Upload, Loader2, X } from 'lucide-react';
import type { PortfolioProject } from '../../../types';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Portfolio Form - v2.1
export default function PortfolioForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: [] as string[],
    short_description: '',
    full_description: '',
    cover_image_url: '',
    gallery: [] as string[],
    tags: [] as string[],
    featured: false,
    published: false
  });

  useEffect(() => {
    if (id) {
      portfolioAPI.getById(id)
        .then(project => {
          if (!project) {
            toast.error('Projeto não encontrado');
            navigate('/admin/portfolio');
            return;
          }
          
          setFormData({
            title: project.title || '',
            slug: project.slug || '',
            category: project.category || [],
            short_description: project.short_description || '',
            full_description: project.full_description || '',
            cover_image_url: project.cover_image_url || '',
            gallery: project.gallery || [],
            tags: project.tags || [],
            featured: project.featured || false,
            published: project.published || false,
          });
          
          // Alert if invalid image URL detected
          if (project.cover_image_url?.includes('console.cloudinary.com')) {
            toast.error('⚠️ URL de imagem inválida detectada! Por favor, faça upload novamente.', {
              duration: 8000
            });
          }
        })
        .catch(err => {
          console.error('Erro ao carregar projeto:', err);
          toast.error('Erro ao carregar projeto');
          navigate('/admin/portfolio');
        });
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('📝 FormData antes de enviar:', JSON.stringify(formData, null, 2));
    console.log('📝 Tipo de category:', typeof formData.category, Array.isArray(formData.category));

    try {
      if (id) {
        await portfolioAPI.update(id, formData);
        toast.success('Projeto atualizado com sucesso');
      } else {
        await portfolioAPI.create(formData);
        toast.success('Projeto criado com sucesso');
      }
      navigate('/admin/portfolio');
    } catch (error) {
      console.error('❌ Erro no submit:', error);
      toast.error('Erro ao salvar projeto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validar URL de imagem do Cloudinary
    if (name === 'cover_image_url' && value) {
      if (value.includes('console.cloudinary.com')) {
        toast.error('❌ URL inválida! Use a URL pública que começa com "res.cloudinary.com"');
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !id ? { slug: generateSlug(value) } : {})
    }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imagem muito grande! Máximo 5MB.');
      return;
    }

    setUploadingCover(true);
    try {
      const result = await cloudinaryAPI.uploadImage(file, 'portfolio');
      setFormData(prev => ({ ...prev, cover_image_url: result.url }));
      toast.success('Upload realizado com sucesso!');
      console.log('Upload bem-sucedido:', result.url);
    } catch (error) {
      console.error('Erro no upload:', error);
      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(`Erro ao fazer upload: ${errorMsg}`);
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validar tamanho
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`Arquivo ${file.name} muito grande! Máximo 5MB.`);
        return;
      }
    }

    setUploadingGallery(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const result = await cloudinaryAPI.uploadImage(file, 'portfolio/gallery');
        urls.push(result.url);
      }
      setFormData(prev => ({ 
        ...prev, 
        gallery: [...prev.gallery, ...urls] 
      }));
      toast.success(`${urls.length} ${urls.length === 1 ? 'imagem enviada' : 'imagens enviadas'}!`);
      console.log('Uploads bem-sucedidos:', urls);
    } catch (error) {
      console.error('Erro no upload:', error);
      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error(`Erro ao fazer upload: ${errorMsg}`);
    } finally {
      setUploadingGallery(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2">{id ? 'Editar Projeto' : 'Novo Projeto'}</h1>
        <p className="text-muted-foreground">Preencha as informações do projeto</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            name="category"
            value={formData.category.join(', ')}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              category: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
            }))}
            required
            className="rounded-none"
          />
          <p className="text-xs text-muted-foreground">
            <strong>Use exatamente:</strong><br />
            • <code className="bg-muted px-1 py-0.5 rounded">Branding</code> (somente Branding)<br />
            • <code className="bg-muted px-1 py-0.5 rounded">Branding, Design Comercial</code><br />
            • <code className="bg-muted px-1 py-0.5 rounded">Branding, Embalagem</code>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="short_description">Descrição Curta</Label>
          <Textarea
            id="short_description"
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            required
            rows={4}
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_description">Descrição Completa</Label>
          <Textarea
            id="full_description"
            name="full_description"
            value={formData.full_description}
            onChange={handleChange}
            rows={8}
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cover_image_url">Imagem de Capa</Label>
          
          {/* Upload button */}
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
              id="cover-upload"
              disabled={uploadingCover}
            />
            <Label
              htmlFor="cover-upload"
              className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none transition-colors ${uploadingCover ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploadingCover ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Selecionar Imagem
                </>
              )}
            </Label>
          </div>

          {/* Preview */}
          {formData.cover_image_url && (
            <div className="mt-3 relative inline-block">
              <img 
                src={formData.cover_image_url} 
                alt="Preview" 
                className="w-full max-w-md h-48 object-cover border border-border"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, cover_image_url: '' }))}
                className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* URL manual (opcional) */}
          <details className="mt-2">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
              Ou cole a URL manualmente
            </summary>
            <Input
              id="cover_image_url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleChange}
              className="rounded-none mt-2"
              placeholder="https://res.cloudinary.com/..."
            />
          </details>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gallery">Galeria de Imagens</Label>
          
          {/* Upload button */}
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
              id="gallery-upload"
              disabled={uploadingGallery}
            />
            <Label
              htmlFor="gallery-upload"
              className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none transition-colors ${uploadingGallery ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploadingGallery ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Adicionar Imagens
                </>
              )}
            </Label>
            <span className="text-sm text-muted-foreground">
              {formData.gallery.length} {formData.gallery.length === 1 ? 'imagem' : 'imagens'}
            </span>
          </div>

          {/* Gallery Preview Grid */}
          {formData.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {formData.gallery.map((url, index) => (
                <div key={index} className="relative group aspect-square">
                  <img 
                    src={url} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-full object-cover border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      gallery: prev.gallery.filter((_, i) => i !== index)
                    }))}
                    className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* URL manual (opcional) */}
          <details className="mt-2">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
              Ou cole URLs manualmente (uma por linha)
            </summary>
            <Textarea
              value={formData.gallery.join('\n')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                gallery: e.target.value.split('\n').map(url => url.trim()).filter(Boolean)
              }))}
              rows={4}
              className="rounded-none font-mono text-sm mt-2"
              placeholder="https://res.cloudinary.com/..."
            />
          </details>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
          <Input
            id="tags"
            value={formData.tags.join(', ')}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
            }))}
            className="rounded-none"
            placeholder="React, TypeScript, Design"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
            <Label htmlFor="featured" className="font-normal cursor-pointer">Projeto em Destaque</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publicado 
              <span className="block text-xs text-muted-foreground font-normal mt-1">
                {formData.published 
                  ? '✅ Projeto visível no site público' 
                  : '⚠️ Projeto oculto - só aparece no admin'}
              </span>
            </Label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="rounded-none" disabled={loading}>
            {loading ? 'Salvando...' : (id ? 'Atualizar Projeto' : 'Criar Projeto')}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="rounded-none"
            onClick={() => navigate('/admin/portfolio')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}