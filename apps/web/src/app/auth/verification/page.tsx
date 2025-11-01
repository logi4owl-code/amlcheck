import { Suspense } from 'react';
import { VerificationClient } from './verification-client';

/**
 * Server Component for email verification page
 * Wraps the client component with Suspense boundary to prevent CSR bailout
 */
export default function VerificationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-950 dark:to-slate-900">
        <div className="text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    }>
      <VerificationClient />
    </Suspense>
  );
}
