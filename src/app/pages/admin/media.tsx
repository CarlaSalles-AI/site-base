import { useState, useEffect } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { mediaAPI } from '../../../lib/api';
import type { MediaAsset } from '../../../types';

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = () => {
    mediaAPI.getAll()
      .then(setMedia)
      .catch(err => console.error('Erro ao carregar mídia:', err));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await mediaAPI.upload(file, 'general', file.name);
      toast.success('Upload realizado com sucesso');
      loadMedia();
    } catch (error) {
      toast.error('Erro ao fazer upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este arquivo?')) return;
    
    try {
      await mediaAPI.delete(id);
      toast.success('Arquivo deletado');
      loadMedia();
    } catch (error) {
      toast.error('Erro ao deletar arquivo');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light mb-2">Mídia</h1>
          <p className="text-muted-foreground">Gerencie seus arquivos</p>
        </div>
        <div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button 
            asChild 
            className="rounded-none cursor-pointer"
            disabled={uploading}
          >
            <label htmlFor="file-upload">
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Enviando...' : 'Upload'}
            </label>
          </Button>
        </div>
      </div>

      {media.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Nenhum arquivo enviado</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map(item => (
            <div key={item.id} className="group relative aspect-square bg-muted overflow-hidden border border-border">
              <img 
                src={item.file_url} 
                alt={item.alt_text || item.file_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="sm"
                  variant="destructive"
                  className="rounded-none"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}