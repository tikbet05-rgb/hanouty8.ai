import Link from 'next/link';
import { ArrowLeft, BarChart3, CreditCard, MessageSquareText, ShoppingBag, Sparkles, Wallet } from 'lucide-react';

const navItems = [
  { label: 'ملخص', href: '/dashboard', icon: BarChart3 },
  { label: 'المساعد الذكي', href: '/assistant', icon: MessageSquareText },
  { label: 'الأسواق', href: '/markets', icon: ShoppingBag },
  { label: 'الشحن والفواتير', href: '/pricing', icon: CreditCard },
  { label: 'الأرباح', href: '/dashboard', icon: Wallet },
  { label: 'التحليلات', href: '/admin', icon: Sparkles }
];

const statCards = [
  { label: 'إجمالي المبيعات', value: '$48,250', trend: '+12.4%' },
  { label: 'صافي الأرباح', value: '$18,620', trend: '+8.1%' },
  { label: 'الطلبات', value: '2,140', trend: '+15.2%' },
  { label: 'المستخدمين', value: '12,800', trend: '+26.8%' }
];

const campaigns = [
  { name: 'Campaign A', roi: '34.8%', status: 'نشط' },
  { name: 'Campaign B', roi: '28.4%', status: 'قيد الاختبار' },
  { name: 'Campaign C', roi: '41.2%', status: 'موافق' }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-sm text-slate-400">RIBH AI</p>
            <h1 className="text-2xl font-black">لوحة التحكم</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/profile" className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200">
              الملف الشخصي
            </Link>
            <Link href="/assistant" className="rounded-full bg-gradient-to-r from-brand-500 to-gold px-4 py-2 text-sm font-bold text-slate-950">
              المساعد
            </Link>
          </div>
        </header>

        <div className="mb-6 rounded-3xl border border-brand-400/30 bg-brand-500/10 p-4 text-sm text-brand-100">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-slate-300">حالة الاشتراك:</span> <span className="font-bold">Pro</span>
            </div>
            <div>
              <span className="text-slate-300">تاريخ التجديد:</span> <span className="font-bold">15 ديسمبر 2026</span>
            </div>
            <Link href="/pricing" className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white">
              إدارة الباقة
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <nav className="space-y-2">
              {navItems.map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href} className="flex items-center gap-3 rounded-2xl border border-transparent bg-slate-900/60 px-3 py-3 text-slate-200 transition hover:border-brand-400/40 hover:bg-brand-500/10">
                  <Icon size={18} className="text-brand-300" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          <main className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => (
                <div key={card.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="text-3xl font-black">{card.value}</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-300">
                      {card.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold">أداء الحملات</h2>
                  <span className="text-sm text-slate-400">آخر 30 يومًا</span>
                </div>

                <div className="space-y-5">
                  {campaigns.map((item) => (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                        <span>{item.name}</span>
                        <span className="font-bold text-white">{item.roi}</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-gold" style={{ width: item.roi.replace('%', '') + '%' }} />
                      </div>
                      <div className="mt-2 text-xs text-slate-400">{item.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-xl font-bold">الأرباح المؤكدة</h2>
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                    <span>مبيعات مؤكدة</span>
                    <span className="font-bold text-emerald-300">$21,440</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                    <span>مبالغ معلقة</span>
                    <span className="font-bold text-yellow-300">$6,180</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                    <span>مستحقات متوقعة</span>
                    <span className="font-bold text-brand-200">$10,320</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

