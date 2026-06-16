import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wrffzykgozzifnimdlwu.supabase.co";   // ← replace
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZmZ6eWtnb3p6aWZuaW1kbHd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDk2NzIwOCwiZXhwIjoyMDk2NTQzMjA4fQ.usWF9_DyqNQdqNt7qydNOJzZGQDNYGDhVY9A7_nSl6A";               // ← replace

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);