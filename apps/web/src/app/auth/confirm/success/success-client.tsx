'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import '@/lib/i18n';

/**
 * Client Component for email confirmation success page
 * Uses useSearchParams to get redirect destination and countdown timer
 */
export function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(3);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Navigate when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      const next = searchParams.get('next') || '/auth/login';
      router.push(next);
    }
  }, [countdown, router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">{t('common.appName')}</span>
          </Link>
        </div>

        {/* Success Card */}
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            {t('auth.confirm.successTitle')}
          </h1>
          
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            {t('auth.confirm.successMessage')}
          </p>

          <div className="text-sm text-slate-500">
            {t('auth.logout.successMessage', { seconds: countdown })}
          </div>
        </div>
      </div>
    </div>
  );
}
