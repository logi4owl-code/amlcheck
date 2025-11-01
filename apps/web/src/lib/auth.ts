/**
 * Authentication utilities using Supabase Auth (server-side)
 */

import { createClient } from '@/lib/supabase/server';
import type { User } from './types';

/**
 * Get current session user from Supabase
 */
export async function getSession(): Promise<User | null> {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
  };
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
