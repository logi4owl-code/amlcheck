'use client';

import Link from 'next/link';
import { Shield, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import '@/lib/i18n';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center">
        <Shield className="mx-auto mb-6 h-16 w-16 text-blue-600" />
        <h1 className="mb-4 text-6xl font-bold text-slate-900 dark:text-white">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-slate-700 dark:text-slate-300">
          {t('notFound.subtitle')}
        </h2>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          {t('notFound.description')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Home className="h-5 w-5" />
          {t('common.actions.goHome')}
        </Link>
      </div>
    </div>
  );
}
