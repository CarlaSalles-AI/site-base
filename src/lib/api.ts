import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { getAuthHeaders } from './supabase';
import type { PortfolioProject, MediaAsset, SiteSettings, ContactSubmission } from '../types';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a04a6230`;

// Helper to get headers with at least the anon key
const getHeaders = (authenticated: boolean = false) => {
  if (authenticated) {
    const authHeaders = getAuthHeaders();
    // If we have a user session, use it; otherwise fall back to anon key
    if (authHeaders.Authorization) {
      return authHeaders;
    }
  }
  // Always include at least the anon key for Supabase Edge Functions
  return {
    'Authorization': `Bearer ${publicAnonKey}`
  };
};

// Portfolio API
export const portfolioAPI = {
  async getAll(published?: boolean): Promise<PortfolioProject[]> {
    const params = published !== undefined ? `?published=${published}` : '';
    const response = await fetch(`${SERVER_URL}/portfolio${params}`, {
      headers: getHeaders(false)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Portfolio API error:', response.status, errorText);
      throw new Error('Erro ao buscar projetos');
    }
    const data = await response.json();
    // Data already comes in correct format from database
    return data;
  },

  async getBySlug(slug: string): Promise<PortfolioProject> {
    const response = await fetch(`${SERVER_URL}/portfolio/${slug}`, {
      headers: getHeaders(false)
    });
    if (!response.ok) throw new Error('Projeto não encontrado');
    const project = await response.json();
    // Data already comes in correct format from database
    return project;
  },

  async getById(id: string): Promise<PortfolioProject> {
    const response = await fetch(`${SERVER_URL}/portfolio/id/${id}`, {
      headers: getHeaders(false)
    });
    if (!response.ok) throw new Error('Projeto não encontrado');
    const project = await response.json();
    return project;
  },

  async create(project: Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at' | 'created_by'>): Promise<PortfolioProject> {
    console.log('📤 Enviando projeto para criar:', JSON.stringify(project, null, 2));
    console.log('📤 Tipo de category:', typeof project.category, Array.isArray(project.category));
    
    const response = await fetch(`${SERVER_URL}/portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getHeaders(true)
      },
      body: JSON.stringify(project)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na criação:', errorText);
      throw new Error(`Erro ao criar projeto: ${errorText}`);
    }
    return response.json();
  },

  async update(id: string, project: Partial<PortfolioProject>): Promise<PortfolioProject> {
    const response = await fetch(`${SERVER_URL}/portfolio/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getHeaders(true)
      },
      body: JSON.stringify(project)
    });
    if (!response.ok) throw new Error('Erro ao atualizar projeto');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${SERVER_URL}/portfolio/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    if (!response.ok) throw new Error('Erro ao deletar projeto');
  }
};

// Media API
export const mediaAPI = {
  async getAll(folder?: string): Promise<MediaAsset[]> {
    const params = folder ? `?folder=${folder}` : '';
    const response = await fetch(`${SERVER_URL}/media${params}`, {
      headers: getHeaders(true)
    });
    if (!response.ok) throw new Error('Erro ao buscar mídia');
    return response.json();
  },

  async upload(file: File, folder: string, altText?: string): Promise<MediaAsset> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    if (altText) formData.append('alt_text', altText);

    const response = await fetch(`${SERVER_URL}/media/upload`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    });
    if (!response.ok) throw new Error('Erro ao fazer upload');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${SERVER_URL}/media/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    if (!response.ok) throw new Error('Erro ao deletar mídia');
  }
};

// Settings API
export const settingsAPI = {
  async get(): Promise<SiteSettings> {
    const response = await fetch(`${SERVER_URL}/settings`, {
      headers: getHeaders(false)
    });
    if (!response.ok) throw new Error('Erro ao buscar configurações');
    return response.json();
  },

  async update(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const response = await fetch(`${SERVER_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getHeaders(true)
      },
      body: JSON.stringify(settings)
    });
    if (!response.ok) throw new Error('Erro ao atualizar configurações');
    return response.json();
  }
};

// Contact API
export const contactAPI = {
  async submit(data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<void> {
    const response = await fetch(`${SERVER_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getHeaders(false)
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erro ao enviar mensagem');
  },

  async getAll(): Promise<ContactSubmission[]> {
    const response = await fetch(`${SERVER_URL}/contact`, {
      headers: getHeaders(true)
    });
    if (!response.ok) throw new Error('Erro ao buscar mensagens');
    return response.json();
  }
};

// Cloudinary API
export const cloudinaryAPI = {
  async uploadImage(file: File, folder: string = 'portfolio'): Promise<{ url: string; public_id: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch(`${SERVER_URL}/cloudinary/upload`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao fazer upload: ${errorText}`);
    }
    
    return response.json();
  }
};