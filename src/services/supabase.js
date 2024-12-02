
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://qarztytvgdjgrpnfcknl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhcnp0eXR2Z2RqZ3JwbmZja25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NDc2MDUsImV4cCI6MjA0MjUyMzYwNX0.svENeqC5_3XUqhQVRJImss8LLy29PNf2V-9Uo9igmYU'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;