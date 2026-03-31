import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

export const getAuthHeaders = () => {
  const session = localStorage.getItem('app_session');
  if (!session) return {};
  
  try {
    const { access_token } = JSON.parse(session);
    return {
      'Authorization': `Bearer ${access_token}`
    };
  } catch {
    return {};
  }
};