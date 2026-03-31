import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { portfolioAPI } from '../../lib/api';
import { placeholderProjects } from '../../data/placeholder-projects';
import type { PortfolioProject } from '../../types';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, ExternalLink, User } from 'lucide-react';

// Portfolio Detail Page - v2.1
export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    portfolioAPI.getBySlug(slug)
      .then(setProject)
      .catch(err => {
        console.error('Erro ao carregar projeto:', err);
        // Em caso de erro, tenta buscar nos placeholders
        const placeholderProject = placeholderProjects.find(p => p.slug === slug);
        if (placeholderProject) {
          setProject(placeholderProject);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Projeto não encontrado</h1>
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/portfolio">Voltar para Portfólio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 relative">
      {/* Hero Image */}
      <section className="w-full">
        <div className="relative aspect-[21/9] bg-muted overflow-hidden">
          {project.cover_image_url ? (
            <img
              src={project.cover_image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-8xl font-light text-muted-foreground/30">
                {project.title?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Project Header */}
      <section className="section-spacing-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Button asChild variant="ghost" className="rounded-none mb-12">
            <Link to="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Portfólio
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-8">
              <div className="space-y-2 mb-8">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {project.category.join(' · ')}
                </p>
                <h1 className="text-5xl lg:text-6xl font-light">
                  {project.title}
                </h1>
              </div>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.short_description}
              </p>
            </div>

            {/* Project Meta */}
            <div className="lg:col-span-4 space-y-6">
              {project.client && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Cliente
                  </h3>
                  <p className="text-base font-semibold">{project.client}</p>
                </div>
              )}

              {project.year && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Ano
                  </h3>
                  <p className="text-lg">{project.year}</p>
                </div>
              )}

              {project.services && project.services.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                    Serviços
                  </h3>
                  <ul className="space-y-2">
                    {project.services.map((service, index) => (
                      <li key={index} className="text-sm">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                    Tecnologias
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      {project.full_description && (
        <section className="section-spacing-sm border-b">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {project.full_description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="section-spacing">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-light mb-12">Galeria</h2>
            <div className="space-y-12">
              {project.gallery.map((image, index) => (
                <div key={index} className="w-full">
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} - Imagem ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project CTA */}
      <section className="section-spacing-sm bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-light mb-6">Veja mais projetos</h3>
          <Button asChild size="lg" className="rounded-none">
            <Link to="/portfolio">
              Ver Portfólio Completo
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}