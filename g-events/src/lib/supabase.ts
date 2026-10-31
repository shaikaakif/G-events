import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Single Supabase client for the app.
// NOTE: With placeholder credentials this client will not connect to a live project.
// The app remains fully functional using demo-data.ts until real credentials are added.
// Never put the service-role key in client-side code.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
