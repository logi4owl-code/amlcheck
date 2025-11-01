'use client';

import { Shield, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import '@/lib/i18n';

export default function ConfirmErrorPage() {
  const { t } = useTranslation();

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

        {/* Error Card */}
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          
          <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            {t('auth.confirm.errorTitle')}
          </h1>
          
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            {t('auth.confirm.errorMessage')}
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/auth/register"
              className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
            >
              {t('common.actions.signUp')}
            </Link>
            
            <Link
              href="/auth/login"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {t('auth.verification.backToLogin')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
