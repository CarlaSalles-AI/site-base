# 📦 Guia de Customização Rápida

Este guia mostra **exatamente onde** trocar cada elemento do template.

---

## ⚡ Quick Start (5 minutos)

### 1. **Cores** → `/src/styles/theme.css` (Linhas 13-14)
```css
--color-primary: #666666;      /* Sua cor principal - DARK MODE */
--color-primary-dark: #333333; /* Sua cor principal - LIGHT MODE */
```

### 2. **Logo** → `/src/app/components/site/header.tsx` (Linha 35)
```tsx
<h1>SUA MARCA</h1>  {/* ← Trocar aqui */}
```

### 3. **Contato** → `/src/app/pages/contato.tsx` (Linhas 91-93)
```tsx
{ icon: Mail, label: 'Email', value: 'contato@suaempresa.com.br' },
{ icon: Phone, label: 'Telefone', value: '(00) 00000-0000' },
{ icon: MapPin, label: 'Localização', value: 'Sua Cidade, Estado' }
```

---

## 🎨 Customização Completa

### **HOME** → `/src/app/pages/home.tsx`

#### Hero (Banner Principal) - Linha 62
```tsx
title={['SEU TÍTULO', 'IMPACTANTE AQUI']}
description="Uma frase que resume o valor que você entrega."
primaryCTA={{ text: 'Botão Principal', href: '/contato' }}
```

#### Serviços - Linhas 37-56
```tsx
const services = [
  {
    icon: Target,
    title: 'Serviço 1',
    description: 'Descrição do seu primeiro serviço...'
  },
  // ...
];
```

#### Vídeo - Linha 90
```tsx
src="https://www.youtube.com/embed/SEU_VIDEO_ID"
```

---

### **SOBRE** → `/src/app/pages/sobre.tsx`

#### Título - Linha 29
```tsx
SOBRE NÓS
```

#### Textos Principais - Linhas 37-59
```tsx
<motion.p>
  Primeiro parágrafo sobre sua empresa...
</motion.p>
```

#### Estatísticas - Linhas 66-68
```tsx
{ value: '10+', label: 'Anos de experiência' },
{ value: '50+', label: 'Projetos entregues' },
{ value: '30+', label: 'Clientes satisfeitos' }
```

---

### **SERVIÇOS** → `/src/app/pages/servicos.tsx`

Procure por `========== CUSTOMIZAR ==========` no arquivo.

---

### **PORTFÓLIO** → `/src/app/pages/portfolio.tsx`

Dados carregam automaticamente do Supabase (tabela `projects`).
Para trocar o nome da página, altere:
- Menu: `/src/app/components/site/header.tsx` (Linha 55)
- Título: `/src/app/pages/portfolio.tsx` (Linha 29)

---

### **CONTATO** → `/src/app/pages/contato.tsx`

#### Título e Descrição - Linhas 79-89
```tsx
VAMOS CONVERSAR

Entre em contato conosco...
```

#### Informações - Linhas 95-97
```tsx
{ icon: Mail, value: 'contato@suaempresa.com.br' },
{ icon: Phone, value: '(00) 00000-0000' },
{ icon: MapPin, value: 'Sua Cidade, Estado' }
```

---

### **FOOTER** → `/src/app/components/site/footer.tsx`

#### Logo - Linha 25
```tsx
<h2>SUA MARCA</h2>
```

#### Serviços - Linhas 55-58
```tsx
<p>Serviço 1</p>
<p>Serviço 2</p>
```

#### Contato - Linhas 66-76
```tsx
contato@suaempresa.com.br
(00) 00000-0000
Sua Cidade, Estado
```

#### Redes Sociais - Linhas 82-105
```tsx
href="https://linkedin.com"
href="https://instagram.com"
href="https://wa.me/5500000000000"
```

---

## 🏗️ Para Imobiliária

Além das customizações acima:

### 1. Menu → Trocar "Portfólio" por "Imóveis"
- `/src/app/components/site/header.tsx` (Linha 55)
- `/src/app/components/site/footer.tsx` (Linha 43)

### 2. Adicionar Campos de Imóvel
No Supabase, adicionar colunas à tabela `projects`:
```sql
- bedrooms (integer)
- bathrooms (integer)
- area (numeric)
- price (numeric)
- address (text)
```

### 3. Cores Recomendadas
```css
--color-primary: #2C5FED;      /* Azul confiança */
--color-primary-dark: #1E40AF;
```

---

## 🎯 Próximos Passos

1. [ ] Alterar cores em `/src/styles/theme.css`
2. [ ] Trocar logo no header e footer
3. [ ] Customizar textos das páginas
4. [ ] Atualizar informações de contato
5. [ ] Trocar links de redes sociais
6. [ ] Conectar Supabase
7. [ ] Adicionar conteúdo do portfolio/catálogo

---

## 💡 Dica Pro

Use o atalho **Ctrl+F** (ou Cmd+F no Mac) e procure por:
- `========== CUSTOMIZAR ==========`
- `SUA MARCA`
- `contato@suaempresa.com.br`

Esses marcadores indicam exatamente o que precisa ser trocado!

---

Dúvidas? Todos os arquivos têm comentários detalhados. 🚀
