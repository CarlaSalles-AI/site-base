import { ReactNode } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { motion } from 'motion/react';

interface HeroProps {
  title: string | ReactNode | string[];
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  image?: string;
  variant?: 'default' | 'bold-impact';
}

export function Hero({ title, subtitle, description, primaryCTA, secondaryCTA, image, variant = 'default' }: HeroProps) {
  // Bold Impact Variant - Inspired by wonjyou.studio
  if (variant === 'bold-impact') {
    return (
      <section className="relative min-h-screen bg-background text-foreground flex items-center overflow-hidden">
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-22 w-full">
          {subtitle && (
            <motion.p 
              className="text-xs font-medium uppercase tracking-wider mb-6 md:mb-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          <div className="max-w-4xl">
            {/* Animated Words - If title is array, animate each word */}
            {Array.isArray(title) ? (
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase leading-[1.05] tracking-tight text-primary mb-8 md:mb-12">
                {title.map((word, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.4 + (index * 0.2),
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    {word}
                  </motion.div>
                ))}
              </h1>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase leading-[0.9] tracking-tight text-primary mb-8 md:mb-12">
                  {title}
                </h1>
              </motion.div>
            )}

            {description && (
              <motion.p 
                className="text-muted-foreground mb-8 md:mb-12 whitespace-nowrap text-[32px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {description}
              </motion.p>
            )}

            {(primaryCTA || secondaryCTA) && (
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {primaryCTA && (
                  <Button 
                    asChild 
                    size="lg"
                    className="rounded-lg bg-primary hover:bg-primary/90 text-white font-bold group w-full sm:w-auto"
                  >
                    <Link to={primaryCTA.href}>
                      {primaryCTA.text}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
                
                {secondaryCTA && (
                  <Button 
                    asChild 
                    size="lg"
                    variant="outline"
                    className="rounded-lg border-foreground text-foreground hover:bg-foreground hover:text-background w-full sm:w-auto"
                  >
                    <Link to={secondaryCTA.href}>
                      {secondaryCTA.text}
                    </Link>
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div 
          className="absolute bottom-8 left-6 lg:left-8 hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="w-12 h-[1px] bg-border" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Role para Descobrir</span>
          <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>
    );
  }

  // Default Variant
  return (
    <section className="min-h-screen flex items-center pt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {subtitle && (
              <motion.p 
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {subtitle}
              </motion.p>
            )}
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-light leading-tight tracking-tight font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>
            
            {description && (
              <motion.p 
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {description}
              </motion.p>
            )}
            
            {(primaryCTA || secondaryCTA) && (
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {primaryCTA && (
                  <Button 
                    asChild 
                    size="lg"
                    className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground group"
                  >
                    <Link to={primaryCTA.href}>
                      {primaryCTA.text}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
                
                {secondaryCTA && (
                  <Button 
                    asChild 
                    size="lg"
                    variant="outline"
                    className="rounded-lg"
                  >
                    <Link to={secondaryCTA.href}>
                      {secondaryCTA.text}
                    </Link>
                  </Button>
                )}
              </motion.div>
            )}
          </div>

          {/* Image */}
          {image && (
            <motion.div 
              className="relative aspect-square lg:aspect-[4/5] bg-muted rounded-sm overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <img 
                src={image} 
                alt="Hero" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}