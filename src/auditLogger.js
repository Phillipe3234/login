import { supabase } from './supabaseClient';

export const logAction = async (userEmail, action) => {
  const { error } = await supabase
    .from('audit_logs')
    .insert([{ user_email: userEmail, action: action }]);

  if (error) console.error('Erro ao auditar:', error);
};