import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type StoreAuth = { client: SupabaseClient; userId: string };

export async function getStoreAuth(request: Request): Promise<StoreAuth | null> {
  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!token || !url || !anonKey) return null;

  const client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return null;

  return { client, userId: data.user.id };
}
