'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, Clock, LogOut, Search, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import '@/lib/i18n';

const SEARCH_COUNTS = {
  searches: 0,
  scenarios: 0,
} as const;

type DashboardClientProps = {
  user: {
    name: string;
  };
};

export function DashboardClient({ user }: DashboardClientProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [showLogoutNotice, setShowLogoutNotice] = useState(false);
  const [logoutCountdown, setLogoutCountdown] = useState(3);
  const [, startTransition] = useTransition();

  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setShowLogoutNotice(true);
    } catch (error) {
      console.error('Logout error:', error);
      setLogoutError(t('auth.logout.error'));
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    if (!showLogoutNotice) {
      return;
    }

    setLogoutCountdown(3);

    const countdownTimer = window.setInterval(() => {
      setLogoutCountdown((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      setShowLogoutNotice(false);
      startTransition(() => {
        router.replace('/');
        router.refresh();
      });
    }, 3000);

    return () => {
      window.clearInterval(countdownTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [router, showLogoutNotice, startTransition]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-900">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">{t('common.appName')}</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {user.name}
            </span>
            <form onSubmit={handleLogout}>
              <button
                type="submit"
                disabled={isLoggingOut}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <LogOut className="h-4 w-4" />
                {t('common.actions.logout')}
              </button>
              {logoutError && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {logoutError}
                </p>
              )}
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {t('dashboard.title')}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {t('dashboard.welcome', { name: user.name })}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Link
            href="/explore"
            className="group rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <Search className="mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
              {t('dashboard.cards.newAnalysis.title')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('dashboard.cards.newAnalysis.description')}
            </p>
          </Link>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Clock className="mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
              {t('dashboard.cards.recentSearches.title')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('dashboard.cards.recentSearches.description', { count: SEARCH_COUNTS.searches })}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Bookmark className="mb-3 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
              {t('dashboard.cards.savedScenarios.title')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('dashboard.cards.savedScenarios.description', { count: SEARCH_COUNTS.scenarios })}
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="rounded-lg border bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Search className="mx-auto mb-4 h-12 w-12 text-slate-400" />
          <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
            {t('dashboard.empty.title')}
          </h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            {t('dashboard.empty.description')}
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Search className="h-4 w-4" />
            {t('common.actions.startAnalyzing')}
          </Link>
        </div>
      </main>
      {showLogoutNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t('auth.logout.successTitle')}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {t('auth.logout.successMessage', { seconds: logoutCountdown })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
