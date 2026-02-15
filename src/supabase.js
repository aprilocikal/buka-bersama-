import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://tzvuizgntfsqaxqmejmw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6dnVpemdudGZzcWF4cW1lam13Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5NzgzNSwiZXhwIjoyMDg2NjczODM1fQ.g1AwASUxU0dfSYMRjCRS9RtgWmrRo3Ykqin2z19ZFlE"

export const supabase = createClient(supabaseUrl, supabaseKey)
