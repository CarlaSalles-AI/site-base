# 🗄️ Guia de Integração Supabase

Este template está **preparado** para integração com Supabase, mas **não conectado por padrão**.

---

## 📋 O que é Supabase?

Supabase é uma plataforma de backend open-source que oferece:
- ✅ **Banco de dados PostgreSQL** (storage de dados)
- ✅ **Autenticação** (login com email/senha, OAuth, etc)
- ✅ **Storage** (upload de arquivos e imagens)
- ✅ **APIs REST automáticas** (sem precisar criar backend)
- ✅ **Real-time** (atualização automática de dados)

**Gratuito** até 500MB de banco + 1GB de storage + 50.000 usuários mensais.

---

## 🚀 Como Conectar ao Supabase

### Passo 1: Criar Conta no Supabase

1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Crie uma conta (GitHub recomendado)
4. Crie um **novo projeto**:
   - Nome: `seu-projeto`
   - Database Password: **(guarde essa senha!)**
   - Region: South America (São Paulo) - mais rápido para Brasil

⏰ **Aguarde 2-3 minutos** enquanto o Supabase provisiona seu banco.

---

### Passo 2: Pegar as Credenciais

1. No painel do Supabase, vá em **Settings** (ícone de engrenagem) → **API**
2. Copie as seguintes informações:

```
Project URL: https://seu-projeto.supabase.co
anon/public key: eyJhbGc...
```

3. No Figma Make, clique no botão **"Connect to Supabase"** que aparece no chat
4. Cole as credenciais quando solicitado

✅ **Pronto!** O template já está configurado para usar o Supabase.

---

## 🗃️ Estrutura do Banco de Dados

### Tabelas Necessárias

O template precisa de **3 tabelas principais**:

#### 1️⃣ **projects** (Portfolio/Catálogo)
Armazena projetos, produtos ou imóveis.

#### 2️⃣ **contacts** (Formulário de Contato)
Armazena mensagens enviadas pelo formulário.

#### 3️⃣ **user_roles** (Controle de Acesso Admin)
Define permissões de usuários (admin_master, editor).

---

## 📝 Migrations SQL

Execute estas queries **na ordem** no Supabase SQL Editor:

### 1. Criar Tabela de Projetos (Portfolio)

```sql
-- ============================================
-- TABELA: projects
-- Descrição: Armazena portfolio/catálogo
-- ============================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  project_url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Campos extras para imobiliária (opcional)
  bedrooms INTEGER,
  bathrooms INTEGER,
  area NUMERIC(10, 2),
  price NUMERIC(12, 2),
  address TEXT,
  status TEXT DEFAULT 'available' -- 'available', 'sold', 'rented'
);

-- Índices para performance
CREATE INDEX idx_projects_featured ON public.projects(featured);
CREATE INDEX idx_projects_category ON public.projects(category);
CREATE INDEX idx_projects_created_at ON public.projects(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
-- Qualquer pessoa pode VER projetos
CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (true);

-- Apenas usuários autenticados podem CRIAR
CREATE POLICY "Authenticated users can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Apenas o criador ou admins podem EDITAR
CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin_master', 'editor')
    )
  );

-- Apenas o criador ou admins podem DELETAR
CREATE POLICY "Users can delete own projects"
  ON public.projects FOR DELETE
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin_master'
    )
  );

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
```

---

### 2. Criar Tabela de Contatos

```sql
-- ============================================
-- TABELA: contacts
-- Descrição: Formulário de contato
-- ============================================

CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'replied'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índice para listar por data
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX idx_contacts_status ON public.contacts(status);

-- Habilitar RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode CRIAR (enviar mensagem)
CREATE POLICY "Anyone can submit contact form"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

-- Apenas admins podem VER mensagens
CREATE POLICY "Only admins can view contacts"
  ON public.contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin_master', 'editor')
    )
  );

-- Apenas admins podem ATUALIZAR status
CREATE POLICY "Only admins can update contacts"
  ON public.contacts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin_master', 'editor')
    )
  );
```

---

### 3. Criar Tabela de Roles (Permissões)

```sql
-- ============================================
-- TABELA: user_roles
-- Descrição: Controle de acesso do painel admin
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin_master', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Índice para buscar role por usuário
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- Habilitar RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Qualquer usuário autenticado pode VER sua própria role
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Apenas admin_master pode CRIAR roles
CREATE POLICY "Only admin_master can create roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin_master'
    )
  );

-- Apenas admin_master pode ATUALIZAR roles
CREATE POLICY "Only admin_master can update roles"
  ON public.user_roles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin_master'
    )
  );

-- Apenas admin_master pode DELETAR roles
CREATE POLICY "Only admin_master can delete roles"
  ON public.user_roles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin_master'
    )
  );
```

---

### 4. Criar Primeiro Admin (IMPORTANTE!)

Depois de criar sua conta no Supabase Auth, você precisa se dar permissão de admin:

```sql
-- ============================================
-- CRIAR PRIMEIRO ADMIN
-- ============================================
-- IMPORTANTE: Substitua 'seu-email@exemplo.com' pelo email que você usou para criar a conta

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin_master'
FROM auth.users
WHERE email = 'seu-email@exemplo.com';
```

✅ Agora você pode fazer login e acessar o painel admin!

---

## 🖼️ Storage (Upload de Imagens)

### Criar Bucket de Imagens

1. No Supabase, vá em **Storage** (ícone de pasta)
2. Clique em **"Create a new bucket"**
3. Nome: `project-images`
4. **Public bucket:** ✅ **Ativado** (para imagens serem acessíveis)

### Política de Upload

Execute no SQL Editor:

```sql
-- Permitir upload de imagens para usuários autenticados
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

-- Qualquer pessoa pode VER imagens (público)
CREATE POLICY "Images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

-- Usuários podem deletar próprias imagens
CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'project-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

---

## 🔐 Configurar Autenticação

### Email/Senha (Padrão)

1. Vá em **Authentication** → **Providers**
2. **Email** já vem ativado por padrão
3. Configure email de confirmação (opcional):
   - Em **Email Templates**, customize os emails

### Criar Usuários Admin

#### Opção 1: Via Interface (Recomendado)
1. Vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - Email: `admin@suaempresa.com`
   - Password: **(senha forte)**
   - ✅ Auto Confirm User
4. Depois, execute o SQL para dar permissão de admin (veja passo 4 acima)

#### Opção 2: Via SQL
```sql
-- Isso só funciona se você desabilitar confirmação de email
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES (
  'admin@suaempresa.com',
  crypt('SuaSenhaForte123', gen_salt('bf')),
  now()
);
```

---

## 📊 Dados de Exemplo (Opcional)

Quer popular o banco com dados de teste?

```sql
-- ============================================
-- INSERIR PROJETOS DE EXEMPLO
-- ============================================

INSERT INTO public.projects (title, description, category, featured, tags)
VALUES 
  (
    'Projeto Exemplo 1',
    'Descrição do primeiro projeto de exemplo.',
    'branding',
    true,
    ARRAY['design', 'branding']
  ),
  (
    'Projeto Exemplo 2',
    'Descrição do segundo projeto de exemplo.',
    'web',
    true,
    ARRAY['web', 'desenvolvimento']
  ),
  (
    'Projeto Exemplo 3',
    'Descrição do terceiro projeto de exemplo.',
    'digital',
    false,
    ARRAY['digital', 'marketing']
  );
```

---

## 🔧 Estrutura de Arquivos do Template

O template já tem tudo preparado para Supabase:

```
/src/lib/
├── supabase.ts        # Cliente Supabase (configuração)
└── api.ts             # Funções de API (CRUD)
```

### Arquivo: `/src/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

// Variáveis de ambiente (automaticamente configuradas pelo Figma Make)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Arquivo: `/src/lib/api.ts`
Funções prontas para usar:
- `portfolioAPI.getAll()` - Listar projetos
- `portfolioAPI.getById(id)` - Buscar projeto específico
- `portfolioAPI.create(data)` - Criar projeto
- `portfolioAPI.update(id, data)` - Atualizar projeto
- `portfolioAPI.delete(id)` - Deletar projeto
- `contactAPI.submit(data)` - Enviar formulário de contato

---

## ✅ Checklist de Configuração

Use este checklist para garantir que tudo está configurado:

- [ ] Criar conta no Supabase
- [ ] Criar novo projeto no Supabase
- [ ] Conectar ao Figma Make (via botão "Connect to Supabase")
- [ ] Executar SQL: Criar tabela `projects`
- [ ] Executar SQL: Criar tabela `contacts`
- [ ] Executar SQL: Criar tabela `user_roles`
- [ ] Criar bucket `project-images` no Storage
- [ ] Configurar políticas de Storage
- [ ] Criar usuário admin via Authentication → Users
- [ ] Executar SQL: Dar permissão de `admin_master` ao seu usuário
- [ ] Testar login no site (ir para `/login`)
- [ ] Testar criar projeto no admin (`/admin`)
- [ ] Testar formulário de contato
- [ ] (Opcional) Inserir dados de exemplo

---

## 🎯 Adaptações para Casos de Uso

### Para Imobiliária

Os campos extras já estão na tabela `projects`:
- `bedrooms` (quartos)
- `bathrooms` (banheiros)
- `area` (área em m²)
- `price` (preço)
- `address` (endereço)
- `status` (disponível/vendido/alugado)

Basta preencher esses campos ao criar um imóvel!

### Para E-commerce

Adicionar campos de produto:

```sql
ALTER TABLE public.projects 
ADD COLUMN stock INTEGER DEFAULT 0,
ADD COLUMN sku TEXT,
ADD COLUMN discount NUMERIC(5, 2) DEFAULT 0;
```

### Para Portfólio Pessoal

Adicionar campo de cliente:

```sql
ALTER TABLE public.projects 
ADD COLUMN client_name TEXT,
ADD COLUMN year INTEGER;
```

---

## 🆘 Problemas Comuns

### 1. "Row Level Security policy violation"
**Causa:** Você não tem permissão para acessar a tabela.
**Solução:** Execute o SQL do passo 4 para dar permissão de admin ao seu usuário.

### 2. "relation 'public.projects' does not exist"
**Causa:** Tabela não foi criada.
**Solução:** Execute o SQL do passo 1 (Criar Tabela de Projetos).

### 3. "JWT expired" ou "Invalid JWT"
**Causa:** Token de autenticação expirou.
**Solução:** Faça logout e login novamente.

### 4. Upload de imagem falha
**Causa:** Bucket não existe ou não tem permissões.
**Solução:** Crie o bucket `project-images` e configure as políticas de Storage.

---

## 📚 Recursos Úteis

- 📖 [Documentação Supabase](https://supabase.com/docs)
- 🎥 [Tutorial Supabase (YouTube)](https://www.youtube.com/watch?v=zBZgdTb-dns)
- 💬 [Discord Supabase](https://discord.supabase.com)
- 🐛 [GitHub Supabase](https://github.com/supabase/supabase)

---

## 🚀 Próximos Passos

Depois de conectar ao Supabase:

1. [ ] Customizar design e cores do template
2. [ ] Adicionar conteúdo (projetos, serviços, textos)
3. [ ] Configurar domínio customizado
4. [ ] Deploy (Vercel, Netlify, Cloudflare Pages)
5. [ ] Configurar emails de contato
6. [ ] Adicionar analytics (Google Analytics, Plausible)

---

**Pronto!** 🎉 Seu template está preparado para Supabase. Quando conectar, tudo vai funcionar automaticamente!
