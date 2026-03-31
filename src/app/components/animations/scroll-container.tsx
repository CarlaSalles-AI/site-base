import { ReactNode } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container otimizado para elementos com scroll tracking
 * Garante position: relative para cálculo correto de offset
 */
export function ScrollContainer({ children, className = '' }: ScrollContainerProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ position: 'relative' }}
    >
      {children}
    </div>
  );
}
