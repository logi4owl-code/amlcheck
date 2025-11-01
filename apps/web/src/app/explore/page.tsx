'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Shield, Search, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DomainGraph } from '@/lib/types';

import '@/lib/i18n';

// Dynamic import to avoid SSR issues with Sigma.js
const GraphCanvas = dynamic(() => import('@/components/GraphCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  ),
});

export default function ExplorePage() {
  const [srcAddress, setSrcAddress] = useState('');
  const [dstAddress, setDstAddress] = useState('');
  const [depth, setDepth] = useState(3);
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState<DomainGraph | null>(null);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const params = new URLSearchParams({
        src: srcAddress,
        dst: dstAddress,
        depth: depth.toString(),
        chains: 'ethereum',
      });

      const res = await fetch(`/api/graph?${params}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t('explore.messages.fetchError'));
        return;
      }

      setGraphData(data);
    } catch {
      setError(t('explore.messages.genericError'));
    } finally {
      setLoading(false);
    }
  };

  // Demo addresses for quick testing
  const fillDemo = () => {
    setSrcAddress('0x1234567890123456789012345678901234567890');
    setDstAddress('0x0987654321098765432109876543210987654321');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-900">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">{t('common.appName')}</span>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t('common.nav.dashboard')}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-1 flex-col px-4 py-6">
        {/* Query Form */}
        <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('explore.form.sourceLabel')}
                </label>
                <input
                  type="text"
                  value={srcAddress}
                  onChange={(e) => setSrcAddress(e.target.value)}
                  placeholder={t('explore.form.addressPlaceholder')}
                  required
                  pattern="^0x[a-fA-F0-9]{40}$"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('explore.form.destinationLabel')}
                </label>
                <input
                  type="text"
                  value={dstAddress}
                  onChange={(e) => setDstAddress(e.target.value)}
                  placeholder={t('explore.form.addressPlaceholder')}
                  required
                  pattern="^0x[a-fA-F0-9]{40}$"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="w-32">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('explore.form.depthLabel', { depth })}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={depth}
                  onChange={(e) => setDepth(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                type="button"
                onClick={fillDemo}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {t('common.actions.fillDemo')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t('common.actions.searching')}
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    {t('common.actions.search')}
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Graph Canvas */}
        <div className="flex-1 rounded-lg border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {!graphData ? (
            <div className="flex h-[800px] items-center justify-center">
              <div className="text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                <p className="text-slate-600 dark:text-slate-400">
                  {t('explore.messages.emptyTitle')}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-[800px]">
              <GraphCanvas data={graphData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
