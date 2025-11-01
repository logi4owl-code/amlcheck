'use client';

import { useState, useEffect } from 'react';
import { Shield, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import '@/lib/i18n';

/**
 * Client Component for email verification page
 * Uses useSearchParams to get email parameter and handle resend functionality
 */
export function VerificationClient() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResend = async () => {
    if (!email) return;

    setResending(true);
    setResendMessage('');

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setResendMessage(t('auth.verification.resentSuccess'));
      } else {
        setResendMessage(t('auth.verification.resentError'));
      }
    } catch {
      setResendMessage(t('auth.verification.resentError'));
    } finally {
      setResending(false);
    }
  };

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

        {/* Verification Card */}
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex justify-center">
            <Mail className="h-16 w-16 text-blue-500" />
          </div>
          
          <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            {t('auth.verification.title')}
          </h1>
          
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            {t('auth.verification.message', { email })}
          </p>

          {resendMessage && (
            <div className={`mb-4 rounded-lg p-3 text-sm ${
              resendMessage === t('auth.verification.resentSuccess')
                ? 'bg-green-50 text-green-600 dark:bg-green-950/30'
                : 'bg-red-50 text-red-600 dark:bg-red-950/30'
            }`}>
              {resendMessage}
            </div>
          )}

          <div className="space-y-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {t('auth.verification.notReceived')}
            </div>
            
            <button
              onClick={handleResend}
              disabled={resending || !email}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <RefreshCw className={`h-4 w-4 ${resending ? 'animate-spin' : ''}`} />
              {resending ? t('auth.verification.resending') : t('auth.verification.resendLink')}
            </button>

            <Link
              href="/auth/login"
              className="block text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {t('auth.verification.backToLogin')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
