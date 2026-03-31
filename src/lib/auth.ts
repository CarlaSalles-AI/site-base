import { supabase } from './supabase';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import type { UserRole, Profile } from '../types';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a04a6230`;

interface AuthSession {
  access_token: string;
  user_id: string;
  email: string;
  role: UserRole;
  name: string;
}

export const auth = {
  async signIn(email: string, password: string): Promise<AuthSession> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(`Erro ao fazer login: ${error.message}`);
    if (!data.session || !data.user) throw new Error('Sessão inválida');

    // Buscar profile do usuário
    const response = await fetch(`${SERVER_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${data.session.access_token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar perfil do usuário');
    }

    const profile: Profile = await response.json();

    const session: AuthSession = {
      access_token: data.session.access_token,
      user_id: data.user.id,
      email: data.user.email!,
      role: profile.role,
      name: profile.nome || profile.name // Support both nome (table) and name (fallback)
    };

    localStorage.setItem('app_session', JSON.stringify(session));
    return session;
  },

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
    localStorage.removeItem('app_session');
  },

  async getSession(): Promise<AuthSession | null> {
    const stored = localStorage.getItem('app_session');
    if (!stored) return null;

    try {
      const session = JSON.parse(stored);
      
      // Validar se o token ainda é válido
      const { data } = await supabase.auth.getUser(session.access_token);
      if (!data.user) {
        localStorage.removeItem('app_session');
        return null;
      }

      return session;
    } catch {
      localStorage.removeItem('app_session');
      return null;
    }
  },

  async createUser(email: string, password: string, name: string, role: UserRole): Promise<void> {
    const session = await this.getSession();
    if (!session || session.role !== 'admin_master') {
      throw new Error('Apenas admin_master pode criar usuários');
    }

    const response = await fetch(`${SERVER_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ email, password, name, role })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Erro ao criar usuário');
    }
  }
};