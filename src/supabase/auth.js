import { supabase } from './supabaseClient';

export async function loginSupabase(rol, password) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('rol', rol)
    .eq('password', password)
    .single();

  if (error || !data) {
    return null;
  }
  return data;
}