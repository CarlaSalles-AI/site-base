import { useEffect, useState } from 'react';
import { PortfolioGrid } from '../components/blocks/portfolio-grid';
import { portfolioAPI } from '../../lib/api';
import type { PortfolioProject } from '../../types';
import { motion } from 'motion/react';
import { placeholderProjects } from '../../data/placeholder-projects';

// v2.0 - Using English database columns
// Mapa de categorias para exibição formatada
const CATEGORY_LABELS: Record<string, string> = {
  'all': 'Todos',
  'branding': 'Branding',
  'design comercial': 'Design Comercial',
  'embalagem': 'Embalagem'
};

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    portfolioAPI.getAll(true)
      .then(data => {
        // Se não houver projetos no Supabase, usa os placeholders
        setProjects(data.length > 0 ? data : placeholderProjects);
      })
      .catch(err => {
        console.error('Erro ao carregar projetos:', err);
        console.error('Detalhes do erro:', err.message, err.stack);
        // Em caso de erro, usa os placeholders
        setProjects(placeholderProjects);
      })
      .finally(() => setLoading(false));
  }, []);

  // Categorias fixas
  const categories = ['all', 'branding', 'design comercial', 'embalagem'];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => {
        // Normalizar categoria para array
        let categories: string[] = [];
        
        if (Array.isArray(p.category)) {
          categories = p.category
            .filter(Boolean)
            .map(cat => cat && typeof cat === 'string' ? cat.toLowerCase().trim() : '')
            .filter(Boolean);
        } else if (typeof p.category === 'string' && p.category) {
          categories = [p.category.toLowerCase().trim()];
        }
        
        console.log('Project:', p.title, 'Categories:', categories, 'Filter:', selectedCategory);
        
        // Filtro simples: mostrar se o projeto contém a categoria selecionada
        return categories.includes(selectedCategory.toLowerCase());
      });

  return (
    <div className="pt-20 relative">
      <section className="section-spacing-sm">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              NOSSOS PROJETOS
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Conheça alguns dos trabalhos que realizamos para nossos clientes.
              <br /><br />
              Cada projeto representa uma solução única desenvolvida com dedicação e expertise.
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {categories.map((category, index) => (
              <button
                key={`category-${category}-${index}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                {CATEGORY_LABELS[category]}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Carregando projetos...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
            </div>
          ) : (
            <PortfolioGrid projects={filteredProjects} />
          )}
        </div>
      </section>
    </div>
  );
}