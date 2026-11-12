import Link from 'next/link';
import { ArrowLeft, Shield, Users, Zap } from 'lucide-react';

const users = [
  { name: 'سارة', plan: 'Pro', revenue: '$2,480' },
  { name: 'أحمد', plan: 'Business', revenue: '$6,120' },
  { name: 'ليلى', plan: 'Free', revenue: '$540' }
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-sm text-slate-400">لوحة الإدارة</p>
            <h1 className="text-2xl font-black">إدارة المستخدمين والمشاريع</h1>
          </div>

          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200">
            <ArrowLeft size={16} /> العودة
          </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-brand-500/15 p-3 text-brand-200"><Users size={20} /></div>
              <div>
                <p className="text-sm text-slate-400">المستخدمون</p>
                <p className="text-3xl font-black">12.8K</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-200"><Zap size={20} /></div>
              <div>
                <p className="text-sm text-slate-400">التكاملات</p>
                <p className="text-3xl font-black">16</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-500/15 p-3 text-yellow-200"><Shield size={20} /></div>
              <div>
                <p className="text-sm text-slate-400">الأمان</p>
                <p className="text-3xl font-black">99.9%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="mb-5 text-xl font-bold">قائمة المستخدمين</h2>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div>
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-sm text-slate-400">{user.plan}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-400">إيرادات</p>
                  <p className="font-bold text-emerald-300">{user.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
