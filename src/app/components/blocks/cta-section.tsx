import { Link } from 'react-router';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'default' | 'minimal';
}

export function CTASection({ title, description, buttonText, buttonHref, variant = 'default' }: CTASectionProps) {
  if (variant === 'minimal') {
    return (
      <section className="section-spacing bg-muted/30 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2">{title}</h2>
              {description && (
                <p className="text-base md:text-lg text-muted-foreground">{description}</p>
              )}
            </div>
            <Button 
              asChild 
              size="lg"
              className="rounded-lg bg-primary hover:bg-primary/90 text-white group shrink-0 w-full md:w-auto"
            >
              <Link to={buttonHref}>
                {buttonText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Quebra o título em 3 linhas se tiver pontuação adequada
  const titleLines = title.split('.').filter(line => line.trim());
  
  // Quebra descrição em parágrafos usando | como separador
  const descriptionParagraphs = description?.split('|').filter(p => p.trim());

  return (
    <section className="section-spacing bg-muted/30 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div 
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                {titleLines.length > 1 ? (
                  <>
                    {titleLines.map((line, index) => (
                      <span key={index}>
                        {line.trim()}
                        {index < titleLines.length - 1 && <br />}
                      </span>
                    ))}
                  </>
                ) : (
                  title
                )}
              </h2>
              {descriptionParagraphs && descriptionParagraphs.length > 0 && (
                <div className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto space-y-4">
                  {descriptionParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
                </div>
              )}
            </div>
            <Button 
              asChild 
              size="lg"
              className="rounded-lg bg-primary hover:bg-primary/90 text-white group"
            >
              <Link to={buttonHref}>
                {buttonText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
  );
}