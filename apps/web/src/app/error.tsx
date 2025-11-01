'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Shield, Home, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import '@/lib/i18n';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center">
        <Shield className="mx-auto mb-6 h-16 w-16 text-red-600" />
        <h1 className="mb-4 text-6xl font-bold text-slate-900 dark:text-white">
          500
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-slate-700 dark:text-slate-300">
          {t('error.subtitle')}
        </h2>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          {t('error.description')}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            <RefreshCw className="h-5 w-5" />
            {t('common.actions.tryAgain')}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            <Home className="h-5 w-5" />
            {t('common.actions.goHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
