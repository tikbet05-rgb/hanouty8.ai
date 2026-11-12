import Link from 'next/link';
import { ArrowLeft, Store, TrendingUp, Wallet } from 'lucide-react';

const marketData = [
  { name: 'Amazon Associates', roi: '29%', traffic: '2.4M' },
  { name: 'AliExpress', roi: '34%', traffic: '1.9M' },
  { name: 'Shopify', roi: '31%', traffic: '1.1M' },
  { name: 'Etsy', roi: '27%', traffic: '840K' },
  { name: 'eBay', roi: '25%', traffic: '960K' }
];

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-sm text-slate-400">الأسواق العالمية</p>
            <h1 className="text-2xl font-black">بحث المنتجات والأسواق</h1>
          </div>

          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200">
            <ArrowLeft size={16} /> العودة
          </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {marketData.map((item) => (
            <div key={item.name} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-200">
                  <Store size={20} />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">{item.roi} هامش</span>
              </div>

              <h2 className="mt-5 text-lg font-bold">{item.name}</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span>الزيارات</span>
                  <span className="font-bold text-white">{item.traffic}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>توقع الربح</span>
                  <span className="font-bold text-white">{item.roi}</span>
                </div>
              </div>

              <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-2 text-sm font-bold text-brand-200">
                <TrendingUp size={16} /> تحليل الفرصة
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
