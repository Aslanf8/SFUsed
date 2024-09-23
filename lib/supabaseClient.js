// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = "https://xezsdlmhqejjkfecmiqt.supabase.co";
const supabaseServiceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlenNkbG1ocWVqamtmZWNtaXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNTA4MjMsImV4cCI6MjA0MjYyNjgyM30.oTD0E4KEMHK1DOuAky16P4rmjde_TWQm-VQaA2VvQ9U";
// NEXT_PUBLIC_SUPABASE_URL=https://xezsdlmhqejjkfecmiqt.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlenNkbG1ocWVqamtmZWNtaXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNTA4MjMsImV4cCI6MjA0MjYyNjgyM30.oTD0E4KEMHK1DOuAky16P4rmjde_TWQm-VQaA2VvQ9U
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
