import Link from 'next/link';
import { ArrowLeft, BadgeCheck, CreditCard, ShieldCheck, UserRound } from 'lucide-react';

const profile = {
  name: 'Mohamed Issou',
  email: 'mohamed@ribh.ai',
  plan: 'Pro',
  status: 'نشط',
  balance: '$2,480',
  nextBilling: '15 ديسمبر 2026'
};

const planFeatures = [
  'وصول إلى المساعد الذكي',
  'مشاركة 3 مشاريع نشطة',
  'تحليل الأسواق والمنتجات',
  'جدولة النشر والتقارير',
  'دعم أولوية'
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-sm text-slate-400">الحساب الشخصي</p>
            <h1 className="text-2xl font-black">الملف الشخصي</h1>
          </div>

          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200">
            <ArrowLeft size={16} /> العودة للوحة
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-gold text-xl font-black text-slate-950">
                MI
              </div>
              <div>
                <p className="text-xl font-black">{profile.name}</p>
                <p className="text-sm text-slate-400">{profile.email}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                <span className="text-slate-400">الباقة</span>
                <span className="inline-flex items-center gap-2 font-bold text-emerald-300"><BadgeCheck size={16} /> {profile.plan}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                <span className="text-slate-400">الحالة</span>
                <span className="font-bold text-brand-200">{profile.status}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                <span className="text-slate-400">لغة الواجهة</span>
                <span className="font-bold">العربية</span>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="mb-5 flex items-center gap-3">
                <UserRound className="text-brand-200" size={20} />
                <h2 className="text-xl font-bold">معلومات الحساب</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-sm text-slate-400">الاسم الكامل</p>
                  <p className="mt-2 text-lg font-bold">{profile.name}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-sm text-slate-400">البريد</p>
                  <p className="mt-2 text-lg font-bold">{profile.email}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-sm text-slate-400">الرصيد</p>
                  <p className="mt-2 text-lg font-bold text-emerald-300">{profile.balance}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-sm text-slate-400">تاريخ التجديد</p>
                  <p className="mt-2 text-lg font-bold">{profile.nextBilling}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="mb-5 flex items-center gap-3">
                <CreditCard className="text-brand-200" size={20} />
                <h2 className="text-xl font-bold">مزايا الباقة الحالية</h2>
              </div>

              <ul className="space-y-3 text-slate-300">
                {planFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                    <ShieldCheck size={18} className="text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/pricing" className="rounded-full bg-gradient-to-r from-brand-500 to-gold px-5 py-2.5 font-bold text-slate-950">
                  ترقية الباقة
                </Link>
                <button className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-semibold text-white">
                  إدارة الفواتير
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
