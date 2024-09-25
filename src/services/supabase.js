import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rablfpsysffatewbyzxa.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmxmcHN5c2ZmYXRld2J5enhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3NjMxMjAsImV4cCI6MjA0MTMzOTEyMH0.f8YCz2VlYxgPRnM-MGc9odWX0K1kTxRCWwOMzFlHZAc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
