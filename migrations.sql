-- ============================================
-- MIGRATIONS SQL - TEMPLATE MULTI-PURPOSE
-- ============================================
-- 
-- Execute estas queries NA ORDEM no Supabase SQL Editor
-- (Settings → Database → SQL Editor → New Query)
--
-- ============================================

-- ============================================
-- 1. TABELA: projects
-- Descrição: Portfolio/Catálogo de projetos/produtos/imóveis
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
  
  -- Campos extras para imobiliária (opcional - deixar NULL se não usar)
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
CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin_master', 'editor')
    )
  );

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

-- ============================================
-- 2. TABELA: contacts
-- Descrição: Mensagens do formulário de contato
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

-- Índices
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX idx_contacts_status ON public.contacts(status);

-- Habilitar RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Anyone can submit contact form"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view contacts"
  ON public.contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin_master', 'editor')
    )
  );

CREATE POLICY "Only admins can update contacts"
  ON public.contacts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role IN ('admin_master', 'editor')
    )
  );

-- ============================================
-- 3. TABELA: user_roles
-- Descrição: Controle de acesso (admin_master, editor)
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin_master', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Índice
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- Habilitar RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Only admin_master can create roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin_master'
    )
  );

CREATE POLICY "Only admin_master can update roles"
  ON public.user_roles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin_master'
    )
  );

CREATE POLICY "Only admin_master can delete roles"
  ON public.user_roles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin_master'
    )
  );

-- ============================================
-- 4. CRIAR PRIMEIRO ADMIN (IMPORTANTE!)
-- ============================================
-- ATENÇÃO: Substitua 'seu-email@exemplo.com' pelo email 
-- que você usou para criar a conta no Supabase Auth

-- Primeiro, crie o usuário em: Authentication → Users → Add user
-- Depois execute esta query:

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin_master'
FROM auth.users
WHERE email = 'seu-email@exemplo.com'; -- ← TROCAR AQUI

-- ============================================
-- 5. STORAGE: Configurar bucket de imagens
-- ============================================
-- Vá em Storage → Create bucket → Nome: "project-images" → Public: ON
-- Depois execute estas políticas:

-- Permitir upload para usuários autenticados
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'project-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- 6. DADOS DE EXEMPLO (OPCIONAL)
-- ============================================
-- Execute isso se quiser popular o banco com dados de teste

INSERT INTO public.projects (title, description, category, featured, tags)
VALUES 
  (
    'Projeto Exemplo 1',
    'Descrição detalhada do primeiro projeto de exemplo. Este é um texto de demonstração.',
    'branding',
    true,
    ARRAY['design', 'branding', 'identidade']
  ),
  (
    'Projeto Exemplo 2',
    'Descrição detalhada do segundo projeto de exemplo. Aqui você pode adicionar mais informações.',
    'web',
    true,
    ARRAY['web', 'desenvolvimento', 'react']
  ),
  (
    'Projeto Exemplo 3',
    'Descrição detalhada do terceiro projeto de exemplo. Mostre os resultados obtidos.',
    'digital',
    false,
    ARRAY['digital', 'marketing', 'redes sociais']
  );

-- ============================================
-- 7. ADAPTAÇÕES ESPECÍFICAS
-- ============================================

-- Para E-COMMERCE - Adicionar campos de produto:
/*
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sku TEXT,
ADD COLUMN IF NOT EXISTS discount NUMERIC(5, 2) DEFAULT 0;
*/

-- Para PORTFOLIO PESSOAL - Adicionar campo de cliente:
/*
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS client_name TEXT,
ADD COLUMN IF NOT EXISTS year INTEGER;
*/

-- Para IMOBILIÁRIA - Campos já incluídos na estrutura base:
-- bedrooms, bathrooms, area, price, address, status

-- ============================================
-- ✅ PRONTO!
-- ============================================
-- Sua base de dados está configurada.
-- Próximos passos:
-- 1. Criar usuário em Authentication → Users
-- 2. Executar query de "CRIAR PRIMEIRO ADMIN" (passo 4)
-- 3. Fazer login no site (/login)
-- 4. Acessar painel admin (/admin)
-- ============================================
