import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ctvhujhlgyqwekgjuajs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dmh1amhsZ3lxd2VrZ2p1YWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDkwNzQsImV4cCI6MjA2MzgyNTA3NH0.u4DtFHgOH4g9Ac4GjfGxZPAvW2rlFojSbZDmGKtwaW4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);