# 🎨 Template Multi-Purpose React + Supabase

## 📋 Sobre este Template

Template profissional React com integração Supabase, pronto para ser customizado para qualquer tipo de negócio: agências, imobiliárias, portfólios, e-commerce, etc.

## 🏗️ Estrutura do Projeto

```
/src
├── /app
│   ├── /components          # Componentes reutilizáveis
│   │   ├── /blocks         # Seções da página (hero, grid, etc)
│   │   ├── /layout         # Header, Footer, Navigation
│   │   └── /ui             # Componentes base (Button, Input, etc)
│   ├── /pages              # Páginas do site
│   └── App.tsx             # Componente principal
├── /lib
│   ├── api.ts              # Integração com Supabase
│   └── supabase.ts         # Cliente Supabase
└── /styles
    ├── theme.css           # 🎨 CUSTOMIZAR CORES AQUI
    └── fonts.css           # Fontes do projeto
```

## 🎨 Como Customizar

### 1. **CORES** (`/src/styles/theme.css`)
```css
--color-primary: #FF6B35;      /* Cor principal */
--color-primary-dark: #2C5FED; /* Cor modo claro */
```

### 2. **TEXTOS** 
- Home: `/src/app/pages/home.tsx`
- Sobre: `/src/app/pages/sobre.tsx`
- Serviços: `/src/app/pages/servicos.tsx`
- Portfólio/Catálogo: `/src/app/pages/portfolio.tsx`
- Contato: `/src/app/pages/contato.tsx`

### 3. **LOGO** (`/src/app/components/layout/header.tsx`)
Trocar texto "SUA MARCA" por logo ou nome da empresa

### 4. **DADOS DO PORTFOLIO/CATÁLOGO**
Conectar ao Supabase e preencher tabela `projects`

### 5. **INFORMAÇÕES DE CONTATO** (`/src/app/pages/contato.tsx`)
- Email
- Telefone/WhatsApp
- Endereço

## 🚀 Recursos Inclusos

✅ **Dark Mode** automático (detecta preferência do sistema)
✅ **Animações** suaves com Motion/React
✅ **Responsivo** mobile-first
✅ **Supabase** para backend (autenticação + database)
✅ **Admin Panel** com controle de acesso
✅ **Portfolio/Catálogo** dinâmico
✅ **Formulário de contato** funcional
✅ **SEO Ready** com React Router

## 📦 Componentes Principais

### Layout
- **Header**: Navegação responsiva com menu mobile
- **Footer**: Informações de contato e redes sociais

### Blocks (Seções)
- **Hero**: Banner principal com CTA
- **PortfolioGrid**: Grid de projetos/produtos
- **ServiceBlocks**: Cards de serviços
- **TestimonialSlider**: Depoimentos de clientes

### UI (Interface)
- Button, Input, Textarea
- Card, Badge
- Dialog, Toast

## 🔧 Tecnologias

- **React 18** + TypeScript
- **Tailwind CSS v4** (design system customizável)
- **Motion** (animações)
- **Supabase** (backend)
- **React Router** (navegação)
- **Lucide React** (ícones)

## 📱 Páginas Incluídas

1. **Home** - Apresentação principal
2. **Sobre** - História e valores da empresa
3. **Serviços** - Detalhamento de serviços
4. **Portfólio** - Catálogo de produtos/projetos
5. **Contato** - Formulário + informações
6. **Admin** - Painel administrativo (protegido)

## 🎯 Casos de Uso

- 🏢 **Agências** (design, marketing, tech)
- 🏠 **Imobiliárias** (catálogo de imóveis)
- 👔 **Portfólios** profissionais
- 🛍️ **Catálogos** de produtos
- 💼 **Serviços B2B**
- 🎨 **Estúdios** criativos

## 🔐 Sistema de Admin

- Login com email/senha (Supabase Auth)
- Roles: `admin_master` e `editor`
- CRUD completo de portfolio
- Upload de imagens

## 📞 Suporte

Template criado com Figma Make
Documentação completa em cada arquivo
