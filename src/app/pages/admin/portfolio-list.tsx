import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2, Star, AlertCircle } from 'lucide-react';
import { portfolioAPI } from '../../../lib/api';
import { toast } from 'sonner';
import type { PortfolioProject } from '../../../types';

// Helper to check if URL is valid Cloudinary URL
const isValidImageUrl = (url: string) => {
  if (!url) return false;
  // Must be HTTPS and must be from Cloudinary res.cloudinary.com
  return url.startsWith('https://res.cloudinary.com/');
};

export default function PortfolioList() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    portfolioAPI.getAll()
      .then(setProjects)
      .catch(err => console.error('Erro ao carregar projetos:', err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return;
    
    try {
      await portfolioAPI.delete(id);
      toast.success('Projeto deletado com sucesso');
      loadProjects();
    } catch (error) {
      toast.error('Erro ao deletar projeto');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light mb-2">Portfólio</h1>
          <p className="text-muted-foreground">Gerencie seus projetos</p>
        </div>
        <Button asChild className="rounded-none">
          <Link to="/admin/portfolio/new">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Nenhum projeto cadastrado</p>
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/admin/portfolio/new">Criar Primeiro Projeto</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => {
            const hasInvalidImage = !isValidImageUrl(project.cover_image_url);
            
            return (
            <div key={project.id} className="border border-border p-4 space-y-4">
              {hasInvalidImage && (
                <div className="bg-orange-50 border border-orange-200 p-2 flex items-center gap-2 text-xs text-orange-800">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>URL de imagem inválida. Edite e faça upload novamente.</span>
                </div>
              )}
              <div className="aspect-video bg-muted overflow-hidden relative">
                {hasInvalidImage ? (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <AlertCircle className="w-12 h-12" />
                  </div>
                ) : (
                  <img 
                    src={project.cover_image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.png';
                    }}
                  />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  {Array.isArray(project.category) ? project.category.join(', ') : project.category}
                </p>
                <h3 className="font-medium">{project.title}</h3>
                <div className="flex gap-2 text-xs">
                  <span className={`px-2 py-1 rounded ${project.published ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                    {project.published ? '✅ Publicado' : '⚠️ Rascunho'}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-1 rounded bg-blue-500 text-white">
                      ⭐ Destaque
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="rounded-none flex-1">
                  <Link to={`/admin/portfolio/edit/${project.id}`}>
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Link>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="rounded-none"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );})}
        </div>
      )}
    </div>
  );
}