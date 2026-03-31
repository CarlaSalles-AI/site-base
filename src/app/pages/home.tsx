import { useState, useEffect } from 'react';
import { Target, Lightbulb, Palette, Cpu } from 'lucide-react';
import type { PortfolioProject } from '../../types';
import { portfolioAPI } from '../../lib/api';
import { placeholderProjects } from '../../data/placeholder-projects';
import { Hero } from '../components/blocks/hero';
import { ServicesSection } from '../components/blocks/services-section';
import { PortfolioGrid } from '../components/blocks/portfolio-grid';
import { CTASection } from '../components/blocks/cta-section';

/* ============================================
   🏠 HOME - PÁGINA PRINCIPAL
   ============================================
   
   CUSTOMIZAR:
   1. Hero: Linhas 54-61 (título, descrição, botões)
   2. Serviços: Array services (linhas 28-48)
   3. Portfolio: Carrega automaticamente do Supabase
   
   ============================================ */

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    portfolioAPI.getAll(true)
      .then(projects => {
        // Se não houver projetos, usa os placeholders
        const allProjects = projects.length > 0 ? projects : placeholderProjects;
        const featured = allProjects.filter(p => p.featured).slice(0, 3);
        setFeaturedProjects(featured);
      })
      .catch(err => {
        console.error('Erro ao carregar projetos:', err);
        // Em caso de erro, usa os placeholders
        const featured = placeholderProjects.filter(p => p.featured).slice(0, 3);
        setFeaturedProjects(featured);
      });
  }, []);

  // ========== SERVIÇOS - CUSTOMIZAR AQUI ==========
  const services = [
    {
      icon: Target,
      title: 'Serviço 1',
      description: 'Descrição do seu primeiro serviço. Explique o que você oferece e como agrega valor ao cliente.'
    },
    {
      icon: Lightbulb,
      title: 'Serviço 2',
      description: 'Descrição do seu segundo serviço. Destaque os diferenciais e benefícios principais.'
    },
    {
      icon: Palette,
      title: 'Serviço 3',
      description: 'Descrição do seu terceiro serviço. Mostre como resolve problemas específicos.'
    },
    {
      icon: Cpu,
      title: 'Serviço 4',
      description: 'Descrição do seu quarto serviço. Enfatize resultados e impacto no negócio.'
    }
  ];

  return (
    <div className="relative">
      {/* ========== HERO - BANNER PRINCIPAL ========== */}
      <Hero
        variant="bold-impact"
        subtitle=""
        title={['SEU TÍTULO', 'IMPACTANTE AQUI']}
        description="Uma frase que resume o principal valor que você entrega para seus clientes."
        primaryCTA={{ text: 'Botão Principal', href: '/contato' }}
        secondaryCTA={{ text: 'Saiba Mais', href: '/servicos' }}
      />

      {/* ========== SEÇÃO DE SERVIÇOS ========== */}
      <ServicesSection
        title="O que fazemos"
        description=""
        services={services}
      />

      {/* ========== PORTFOLIO DESTACADO ========== */}
      {featuredProjects.length > 0 && (
        <section className="section-spacing-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-light mb-4">Projetos Selecionados</h2>
                <p className="text-lg text-muted-foreground">
                  Conheça alguns dos nossos trabalhos mais recentes
                </p>
              </div>
            </div>
            <PortfolioGrid projects={featuredProjects} />
          </div>
        </section>
      )}

      <CTASection
        title="SEU TÍTULO DE CHAMADA AQUI"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.|Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        buttonText="Fale Conosco"
        buttonHref="/contato"
      />
    </div>
  );
}