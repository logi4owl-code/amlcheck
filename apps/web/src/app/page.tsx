'use client';

import Link from 'next/link';
import { Search, LineChart, Shield, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';

import '@/lib/i18n';

export default function Home() {
  const { t } = useTranslation();
  const { user, loading, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-950/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex itemscenter gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">{t('common.appName')}</span>
          </div>
          <nav className="flex items-center gap-4">
            {loading ? (
              <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            ) : user ? (
              <>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('common.nav.greeting', { name: user.name })}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <LogOut className="h-4 w-4" />
                  {t('common.actions.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {t('common.nav.login')}
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  {t('common.nav.signup')}
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('home.hero.titleMain')}
            <br />
            <span className="text-blue-600">{t('home.hero.titleHighlight')}</span>
          </h1>
          <p className="mb-8 text-xl text-slate-600 dark:text-slate-400">
            {t('home.hero.description')}
          </p>

          {/* CTA */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Search className="h-5 w-5" />
              {t('common.actions.startAnalyzing')}
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <LineChart className="h-5 w-5" />
              {t('common.actions.viewDashboard')}
            </Link>
          </div>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Search className="mb-3 h-8 w-8 text-blue-600" />
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                {t('home.features.search.title')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('home.features.search.description')}
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <LineChart className="mb-3 h-8 w-8 text-blue-600" />
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                {t('home.features.graph.title')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('home.features.graph.description')}
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Shield className="mb-3 h-8 w-8 text-blue-600" />
              <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                {t('home.features.risk.title')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('home.features.risk.description')}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm dark:bg-slate-950/50">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {t('common.footer', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
}
