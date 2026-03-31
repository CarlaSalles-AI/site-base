import { Link } from 'react-router';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import type { PortfolioProject } from '../../../types';

interface PortfolioGridProps {
  projects: PortfolioProject[];
  columns?: 2 | 3;
}

export function PortfolioGrid({ projects, columns = 3 }: PortfolioGridProps) {
  const gridCols = columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  // Debug: log projects to see cover_image_url
  console.log('PortfolioGrid projects:', projects.map(p => ({ 
    title: p.title, 
    cover_image_url: p.cover_image_url 
  })));

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8 lg:gap-12 relative`}>
      {projects.map((project, index) => {
        // Category is always an array now
        const categoryDisplay = project.category.join(', ');

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Link
              to={`/portfolio/${project.slug}`}
              className="group block"
            >
              <div className="space-y-4">
                <motion.div 
                  className="relative aspect-[4/3] bg-background overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {project.cover_image_url ? (
                    <ImageWithFallback
                      src={project.cover_image_url}
                      alt={project.title || ''}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-4xl font-light text-muted-foreground/30">
                        {project.title?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </motion.div>
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: '#b1b3b6' }}>
                    {categoryDisplay}
                  </p>
                  <h3 className="text-xl font-normal group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {project.short_description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}