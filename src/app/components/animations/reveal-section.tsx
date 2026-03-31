import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reveal Section com ClipPath Animation
 * Inspirado em wonjyou.studio - efeito de "cortina" que revela o conteúdo
 */
export function RevealSection({ children, className = '' }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      'polygon(0% 0%, 100% 0%, 100% 110%, 0% 110%)'
    ]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ clipPath }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Skew baseado na velocidade do scroll
 * Cria um efeito de "elasticidade" premium
 */
export function SkewSection({ children, className = '' }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const skewRef = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Detecta mudanças na velocidade
  useEffect(() => {
    let lastProgress = 0;
    let lastTime = Date.now();

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const now = Date.now();
      const timeDelta = now - lastTime;
      const progressDelta = latest - lastProgress;
      
      // Calcula velocidade
      const velocity = (progressDelta / timeDelta) * 1000;
      
      // Limita o skew entre -4 e 4 graus
      const targetSkew = Math.max(-4, Math.min(4, -velocity * 2));
      skewRef.current = targetSkew;
      
      lastProgress = latest;
      lastTime = now;
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const skewY = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const interval = setInterval(() => {
      skewY.set(skewRef.current);
      skewRef.current *= 0.9; // Decay
    }, 16);

    return () => clearInterval(interval);
  }, [skewY]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ 
          skewY,
          transformOrigin: 'center center'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Scale massivo no scroll - efeito "zoom explosivo"
 * Ideal para transições dramáticas entre seções
 */
export function MassiveScaleSection({ children, className = '' }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 120]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -window.innerHeight]);

  return (
    <div ref={ref} className="relative" style={{ position: 'relative' }}>
      <motion.div
        style={{ scale, y }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Parallax com Pin - mantém elemento fixo enquanto scroll acontece
 */
export function PinParallaxSection({ 
  children, 
  className = '',
  duration = 2 
}: RevealSectionProps & { duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * duration]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <div 
      ref={ref} 
      className={`relative ${className}`}
      style={{ height: `${100 * (duration + 1)}vh` }}
    >
      <motion.div
        style={{ y, opacity }}
        className="sticky top-0 h-screen flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Magnetic Hover - elemento segue o cursor
 */
export function MagneticElement({ 
  children, 
  strength = 0.3,
  className = '' 
}: RevealSectionProps & { strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/**
 * Text Reveal Line by Line
 * Cada linha aparece sequencialmente com clip-path
 */
export function TextRevealByLine({ 
  text, 
  className = '',
  delay = 0 
}: { text: string; className?: string; delay?: number }) {
  const lines = text.split('\n');

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: delay + (i * 0.1),
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}