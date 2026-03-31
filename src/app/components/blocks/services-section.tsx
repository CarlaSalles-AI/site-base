import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { MagneticElement } from '../animations/reveal-section';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  title: string;
  description?: string;
  services: Service[];
}

export function ServicesSection({ title, description, services }: ServicesSectionProps) {
  return (
    <section className="section-spacing-sm border-b relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{title}</h2>
          {description && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index} 
                className="space-y-4 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="w-12 h-12 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}