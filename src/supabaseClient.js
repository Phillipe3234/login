import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validação para evitar erros silenciosos
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro: Variáveis do Supabase não encontradas!');
  console.log('URL:', supabaseUrl);
  console.log('KEY:', supabaseAnonKey ? 'Presente' : 'Ausente');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
