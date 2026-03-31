import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Briefcase, Mail, Image as ImageIcon, TrendingUp } from 'lucide-react';
import { portfolioAPI, contactAPI } from '../../../lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    contactSubmissions: 0,
    mediaAssets: 0
  });

  useEffect(() => {
    Promise.all([
      portfolioAPI.getAll(),
      contactAPI.getAll().catch(() => [])
    ]).then(([projects, contacts]) => {
      setStats({
        totalProjects: projects.length,
        publishedProjects: projects.filter(p => p.published).length,
        contactSubmissions: contacts.length,
        mediaAssets: 0 // Will be updated with media API
      });
    });
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Projetos
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.publishedProjects} publicados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mensagens de Contato
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contactSubmissions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total recebidas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Arquivos de Mídia
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mediaAssets}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Na biblioteca
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Publicação
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalProjects > 0 
                ? Math.round((stats.publishedProjects / stats.totalProjects) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Projetos publicados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <a 
              href="/admin/portfolio/new" 
              className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Novo Projeto
            </a>
            <a 
              href="/admin/media" 
              className="px-6 py-3 bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors"
            >
              Enviar Mídia
            </a>
            <a 
              href="/" 
              target="_blank"
              className="px-6 py-3 bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors"
            >
              Ver Site
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}