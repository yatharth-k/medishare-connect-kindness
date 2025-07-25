// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yblinihbzpooyxmpveas.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibGluaWhienBvb3l4bXB2ZWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDY5NDQsImV4cCI6MjA2ODQ4Mjk0NH0.VcG_WsPPHNZv6bpwgssayQZKhiA99ITCWce5x1tsKzc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});