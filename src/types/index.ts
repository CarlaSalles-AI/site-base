// Core Types para o sistema

export type UserRole = 'admin_master' | 'editor';

export interface Profile {
  id: string;
  name?: string; // Legacy field for backward compatibility
  nome?: string; // New field from usuarios table
  email: string;
  role: UserRole;
  created_at: string;
}

export interface PortfolioProject {
  id: string;
  titulo: string; // Mapeado para title no frontend
  title: string; // Campo legado, sincronizado com titulo
  slug: string;
  client?: string;
  category: string[]; // Array de categorias
  short_description: string;
  full_description?: string;
  services?: string[];
  year?: number;
  cover_image_url?: string;
  gallery?: string[];
  tags?: string[];
  destaque?: boolean; // Campo principal no banco
  featured?: boolean; // Campo legado, sincronizado com destaque
  published?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  alt_text: string;
  folder: string;
  uploaded_by: string;
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  contact_email: string;
  whatsapp: string;
  social_links: {
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  nome: string; // Campo no banco
  name?: string; // Alias para compatibilidade
  email: string;
  empresa?: string; // Campo no banco
  company?: string; // Alias para compatibilidade
  mensagem: string; // Campo no banco
  message?: string; // Alias para compatibilidade
  lida?: boolean; // Nova coluna
  created_at: string;
}