# 🎨 Template Multi-Purpose - React + Supabase

Template profissional pronto para ser customizado para qualquer tipo de negócio: **agências, imobiliárias, portfólios, e-commerce** e muito mais.

> ⚠️ **Template desconectado do Supabase por padrão**  
> Para conectar, veja o guia: [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)

---

## 🚀 Como Começar

### 1️⃣ **Personalizar Cores**
Abra `/src/styles/theme.css` (linhas 16-17) e altere as cores principais:

```css
--color-primary: #666666;      /* Sua cor principal (DARK MODE) */
--color-primary-dark: #333333; /* Sua cor principal (LIGHT MODE) */
```

### 2️⃣ **Alterar Textos**
Todos os textos estão com comentários `========== CUSTOMIZAR ==========`:

- **Home**: `/src/app/pages/home.tsx`
- **Sobre**: `/src/app/pages/sobre.tsx`  
- **Serviços**: `/src/app/pages/servicos.tsx`
- **Portfólio**: `/src/app/pages/portfolio.tsx`
- **Contato**: `/src/app/pages/contato.tsx`

📖 **Guia detalhado**: [`CUSTOMIZATION_GUIDE.md`](./CUSTOMIZATION_GUIDE.md)

### 3️⃣ **Trocar Logo**
Em `/src/app/components/site/header.tsx`, linha 35:

```tsx
<h1 className="text-2xl font-bold uppercase tracking-tight text-primary">
  SUA MARCA  {/* ← Trocar aqui */}
</h1>
```

### 4️⃣ **Conectar Supabase (Opcional)**
O template funciona sem backend, mas se precisar de:
- Portfolio/catálogo dinâmico
- Formulário de contato com storage
- Painel administrativo
- Autenticação de usuários

📖 **Siga o guia completo**: [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)

---

## 📦 Estrutura do Projeto

```
/
├── README.md                    # Este arquivo
├── CUSTOMIZATION_GUIDE.md       # Guia de customização rápida
├── SUPABASE_SETUP.md            # Guia completo de Supabase
├── migrations.sql               # SQL para criar banco de dados
│
├── /src
│   ├── /app
│   │   ├── /components
│   │   │   ├── /blocks       # Seções (Hero, Grid, Services)
│   │   │   ├── /site         # Header e Footer
│   │   │   ├── /ui           # Componentes base (Button, Input...)
│   │   │   └── /animations   # Animações Motion
│   │   ├── /pages            # Páginas do site
│   │   ├── App.tsx           # Componente principal
│   │   └── routes.tsx        # Configuração de rotas
│   ├── /lib
│   │   ├── api.ts            # Funções de API (Supabase)
│   │   └── supabase.ts       # Cliente Supabase
│   └── /styles
│       ├── theme.css         # 🎨 CORES E DESIGN SYSTEM
│       └── fonts.css         # Importação de fontes
│
└── /public                     # Assets estáticos
```

---

## 🎯 Componentes Principais

### 📍 **Header** (`/src/app/components/site/header.tsx`)
- Navegação responsiva
- Menu mobile animado
- Dark mode toggle (auto-detecta preferência do sistema)
- Botão CTA customizável
- Link para login/admin

### 🏠 **Home** (`/src/app/pages/home.tsx`)
- Hero banner com títulos impactantes (Motion animations)
- Grid de serviços com ícones
- Seção de vídeo embed (YouTube)
- Portfolio destacado (3 projetos em destaque)

### 📄 **Outras Páginas**
- **Sobre**: História, estatísticas e processo
- **Serviços**: Cards detalhados de serviços
- **Portfólio**: Grid de projetos/produtos (dinâmico se conectado ao Supabase)
- **Contato**: Formulário + informações + WhatsApp
- **Admin**: Painel de controle (protegido por autenticação)

### 🎨 **Footer** (`/src/app/components/site/footer.tsx`)
- Links de navegação
- Informações de contato
- Redes sociais
- Copyright automático (ano atual)

---

## 🔧 Tecnologias

- ⚛️ **React 18** + TypeScript
- 🎨 **Tailwind CSS v4** (design system customizável)
- ✨ **Motion** (animações fluidas e profissionais)
- 🗄️ **Supabase** (backend as a service - opcional)
- 🧭 **React Router** (navegação entre páginas)
- 🎯 **Lucide React** (biblioteca de ícones)
- 📝 **React Hook Form** (formulários otimizados)
- 🔔 **Sonner** (notificações toast elegantes)

---

## 🎨 Casos de Uso

| Tipo de Negócio | O que trocar | Documentação |
|-----------------|--------------|--------------|
| **Imobiliária** | "Portfólio" → "Imóveis"<br>Adicionar: quartos, área, preço | Ver `CUSTOMIZATION_GUIDE.md` |
| **Agência** | Trocar textos dos serviços<br>Cores vibrantes | Estrutura já ideal |
| **E-commerce** | "Portfólio" → "Produtos"<br>Adicionar: estoque, SKU, preço | Ver migrations.sql |
| **Portfólio Pessoal** | Remover seção "Serviços"<br>Focar em projetos | Estrutura já ideal |

---

## 📱 Páginas Incluídas

✅ **Home** - Hero + Serviços + Portfolio destacado + Vídeo  
✅ **Sobre** - História + Estatísticas + Processo  
✅ **Serviços** - Cards detalhados com ícones  
✅ **Portfólio** - Grid de projetos (dinâmico com Supabase)  
✅ **Contato** - Formulário + Informações + WhatsApp  
✅ **Admin** - Painel CRUD de portfolio (requer Supabase)  
✅ **Login** - Autenticação de usuários (requer Supabase)  

---

## 🔐 Sistema Admin (Requer Supabase)

- Login com email/senha (Supabase Auth)
- Roles: `admin_master` (total) e `editor` (limitado)
- CRUD completo de portfolio/projetos
- Upload de imagens (Supabase Storage)
- Gestão de mensagens de contato

📖 **Como configurar**: [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)

---

## 💡 Dicas de Customização Rápida

### Cores (2 minutos)
```css
/* /src/styles/theme.css - linhas 16-17 */
--color-primary: #FF6B35;      /* Laranja vibrante */
--color-primary-dark: #2C5FED; /* Azul confiança */
```

### Logo (1 minuto)
```tsx
/* /src/app/components/site/header.tsx - linha 35 */
<h1>IMOBILIÁRIA XYZ</h1>
```

### Contato (2 minutos)
```tsx
/* /src/app/pages/contato.tsx - linhas 91-93 */
{ icon: Mail, value: 'contato@suaempresa.com.br' },
{ icon: Phone, value: '(11) 99999-9999' },
{ icon: MapPin, value: 'São Paulo, SP' }
```

📖 **Guia completo**: [`CUSTOMIZATION_GUIDE.md`](./CUSTOMIZATION_GUIDE.md)

---

## 📚 Documentação Disponível

1. **README.md** (este arquivo) - Visão geral do template
2. **CUSTOMIZATION_GUIDE.md** - Guia passo a passo de customização
3. **SUPABASE_SETUP.md** - Configuração completa do Supabase
4. **migrations.sql** - Scripts SQL para criar banco de dados
5. **Comentários nos arquivos** - Todos os componentes têm documentação inline

---

## 🎯 Próximos Passos

### Customização Básica (sem backend)
1. [ ] Alterar cores em `/src/styles/theme.css`
2. [ ] Trocar logo no header e footer
3. [ ] Customizar textos das páginas
4. [ ] Atualizar informações de contato
5. [ ] Trocar URL do vídeo na home
6. [ ] Atualizar links de redes sociais

### Com Supabase (backend completo)
7. [ ] Seguir guia `SUPABASE_SETUP.md`
8. [ ] Executar migrations SQL
9. [ ] Criar usuário admin
10. [ ] Adicionar projetos via painel admin
11. [ ] Testar formulário de contato
12. [ ] Fazer upload de imagens

### Deploy
13. [ ] Escolher plataforma (Vercel, Netlify, Cloudflare Pages)
14. [ ] Configurar variáveis de ambiente (se usar Supabase)
15. [ ] Conectar domínio customizado
16. [ ] Configurar analytics (opcional)

---

## 🆘 Suporte e Recursos

- 📖 **Comentários inline**: Cada arquivo tem instruções detalhadas
- 🔍 **Buscar por**: `========== CUSTOMIZAR ==========` nos arquivos
- 📝 **Guias**: Veja `CUSTOMIZATION_GUIDE.md` e `SUPABASE_SETUP.md`
- 🎨 **Design System**: Tudo configurado em `/src/styles/theme.css`

---

## ⚡ Features

✅ Design profissional e moderno  
✅ Totalmente responsivo (mobile-first)  
✅ Dark mode automático  
✅ Animações suaves (Motion)  
✅ SEO friendly  
✅ Performance otimizada  
✅ Acessibilidade (WCAG)  
✅ TypeScript (type-safe)  
✅ Componentes reutilizáveis  
✅ Código limpo e documentado  

---

**Pronto para começar!** 🚀  
Criado com ❤️ usando Figma Make