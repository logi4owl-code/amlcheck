/**
 * Route handler for email confirmation
 * Handles the callback when user clicks verification link in email
 */

import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/auth/login';

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Successfully verified, redirect to login or specified page
      return NextResponse.redirect(new URL(`/auth/confirm/success?next=${encodeURIComponent(next)}`, request.url));
    }
  }

  // If verification failed or invalid params, redirect to error page
  return NextResponse.redirect(new URL('/auth/confirm/error', request.url));
}
