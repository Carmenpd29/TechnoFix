import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ayjrjaiymfwttgafimmy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5anJqYWl5bWZ3dHRnYWZpbW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDA3NTMsImV4cCI6MjA2MzkxNjc1M30.8U7706Rd9twE8Ltptrt1SwM1rvR5v93Qo8UQC35kDaU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);