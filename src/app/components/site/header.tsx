import { Link } from 'react-router';
import { Menu, User } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ui/theme-toggle';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ============================================
   📍 HEADER - COMPONENTE DE NAVEGAÇÃO
   ============================================
   
   CUSTOMIZAR:
   1. Logo: Linha 25 (trocar por logo ou nome)
   2. Links do menu: Linhas 30-51 (desktop) e 99-124 (mobile)
   3. Botão CTA: Linha 64 (texto "Iniciar Projeto")
   4. Cores: Definidas em /src/styles/theme.css
   
   ============================================ */

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ========== LOGO - TROCAR AQUI ========== */}
          <Link to="/" className="hover:opacity-70 transition-opacity">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-primary">
              SUA MARCA
            </h1>
          </Link>

          {/* ========== MENU DESKTOP ========== */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/sobre" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              Sobre
            </Link>
            <Link 
              to="/servicos" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              Serviços
            </Link>
            <Link 
              to="/portfolio" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              Portfólio {/* ← Trocar para "Imóveis" se for imobiliária */}
            </Link>
            <Link 
              to="/contato" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              Contato
            </Link>
            <ThemeToggle />
            <Link 
              to="/login"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            {/* ========== BOTÃO CTA - TROCAR TEXTO ========== */}
            <div className="flex items-center gap-2">
              <Button 
                asChild 
                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>

          {/* ========== MENU MOBILE - BOTÃO ========== */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <Link 
              to="/login"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* ========== MENU MOBILE - DROPDOWN ========== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden py-6 border-t border-border overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-4">
                <Link 
                  to="/sobre" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre
                </Link>
                <Link 
                  to="/servicos" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link 
                  to="/portfolio" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfólio
                </Link>
                <Link 
                  to="/contato" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
                <Button 
                  asChild 
                  className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                >
                  <Link to="/contato" onClick={() => setMobileMenuOpen(false)}>
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}