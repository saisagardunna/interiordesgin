import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uczawpwktixjksptfkoc.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_VrqnJZftal3MpXX1-D05lw_MRf5OgTU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
