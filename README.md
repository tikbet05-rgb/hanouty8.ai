'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { isSupabaseReady } from '@/lib/supabase';

const benefitList = [
  'تسجيل دخول آمن مع تراخيص واضحة',
  'لوحة تحكم MVP جاهزة للتوسعة',
  'بيانات داخلية صالحة للتطوير ومختبرة',
  'موافقة قبل الشراء أو النشر أو العمليات الحساسة'
];

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('demo@ribh.ai');
  const [password, setPassword] = useState('demo123');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const redirectTo = searchParams.get('redirectTo') || '/dashboard';

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      setStatus(result.message || 'تم تسجيل الدخول بنجاح.');
      router.push(redirectTo);
      return;
    }

    setStatus(result.message || 'حدث خطأ أثناء تسجيل الدخول.');
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow lg:grid-cols-2">
        <div className="bg-gradient-to-br from-brand-500/20 via-slate-900 to-purple-900 p-8">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-sm text-brand-200">
                <ShieldCheck size={16} /> تجربة الدخول الآمن
              </div>
              <h1 className="text-4xl font-black">RIBH AI</h1>
              <p className="mt-4 text-slate-300">منصة ذكية لتوليد الدخل وتوسيع الأعمال عبر الذكاء الاصطناعي، الأسواق، والتسويق الرقمي.</p>
            </div>

            <ul className="mt-8 space-y-4">
              {benefitList.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-black">تسجيل الدخول</h2>
          <p className="mt-2 text-slate-400">ابدأ بإدارة حسابك، مشاريعك، ومساعدك الذكي.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">البريد الإلكتروني</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 outline-none placeholder:text-slate-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 outline-none placeholder:text-slate-500"
                placeholder="••••••••"
              />
            </div>

            {!isSupabaseReady ? (
              <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200">
                تم تفعيل الوضع التجريبي. أضف NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY لتفعيل Supabase الحقيقي.
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-gradient-to-r from-brand-500 to-gold px-4 py-3 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>

            <button type="button" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white">
              المتابعة مع Google
            </button>

            {status ? <p className="text-sm text-emerald-300">{status}</p> : null}
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
            <Link href="/" className="hover:text-white">العودة للصفحة الرئيسية</Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 font-medium text-brand-200 hover:text-brand-100">
              عرض لوحة التحكم <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
