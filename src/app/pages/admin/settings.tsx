import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { settingsAPI } from '../../../lib/api';
import type { SiteSettings } from '../../../types';

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    settingsAPI.get().then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setLoading(true);
    try {
      await settingsAPI.update(settings);
      toast.success('Configurações atualizadas');
    } catch (error) {
      toast.error('Erro ao atualizar configurações');
    } finally {
      setLoading(false);
    }
  };

  if (!settings) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2">Configurações</h1>
        <p className="text-muted-foreground">Configurações gerais do site</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="site_name">Nome do Site</Label>
          <Input
            id="site_name"
            value={settings.site_name}
            onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_email">Email de Contato</Label>
          <Input
            id="contact_email"
            type="email"
            value={settings.contact_email}
            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            value={settings.whatsapp}
            onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
            className="rounded-none"
            placeholder="+55 11 99999-9999"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={settings.social_links?.linkedin || ''}
            onChange={(e) => setSettings({ 
              ...settings, 
              social_links: { ...settings.social_links, linkedin: e.target.value }
            })}
            className="rounded-none"
            placeholder="https://linkedin.com/..."
          />
        </div>

        <Button type="submit" className="rounded-none" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Configurações'}
        </Button>
      </form>
    </div>
  );
}