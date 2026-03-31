import { Link } from 'react-router';
import { Linkedin, Instagram, MessageCircle } from 'lucide-react';

/* ============================================
   📍 FOOTER - RODAPÉ DO SITE
   ============================================
   
   CUSTOMIZAR:
   1. Logo/Nome: Linha 17
   2. Descrição: Linha 21
   3. Serviços: Linhas 48-51
   4. Contato: Linhas 60-73
   5. Redes sociais: Linhas 77-99
   
   ============================================ */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* ========== LOGO E DESCRIÇÃO ========== */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
              SUA MARCA
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Breve descrição sobre sua empresa e o que você faz.
            </p>
          </div>

          {/* ========== NAVEGAÇÃO ========== */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-4">Navegação</h4>
            <div className="flex flex-col gap-3">
              <Link to="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </Link>
              <Link to="/servicos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Serviços
              </Link>
              <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Portfólio
              </Link>
              <Link to="/contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </Link>
            </div>
          </div>

          {/* ========== SERVIÇOS - CUSTOMIZAR AQUI ========== */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-4">Serviços</h4>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">Serviço 1</p>
              <p className="text-sm text-muted-foreground">Serviço 2</p>
              <p className="text-sm text-muted-foreground">Serviço 3</p>
              <p className="text-sm text-muted-foreground">Serviço 4</p>
            </div>
          </div>

          {/* ========== CONTATO - CUSTOMIZAR AQUI ========== */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-4">Contato</h4>
            <div className="flex flex-col gap-3 mb-6">
              <a 
                href="mailto:contato@suaempresa.com.br" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                contato@suaempresa.com.br
              </a>
              <a 
                href="tel:+5500000000000" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                (00) 00000-0000
              </a>
              <p className="text-sm text-muted-foreground">
                Sua Cidade, Estado
              </p>
            </div>
            {/* ========== REDES SOCIAIS - CUSTOMIZAR AQUI ========== */}
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5500000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* ========== COPYRIGHT ========== */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Sua Empresa. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Termos
            </a>
            <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}