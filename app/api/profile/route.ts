import Link from 'next/link';
import { ArrowLeft, Check, Crown, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'لبدء التجربة الأساسية',
    features: ['مساعد محدود', 'لوحة تحكم أساسية', 'مستخدم واحد'],
    highlighted: false
  },
  {
    name: 'Pro',
    price: '49',
    description: 'للأعمال الصغيرة والمتوسطة',
    features: ['المساعد الذكي الكامل', 'إدارة الأسواق', 'تقارير يومية', 'دعم أولوية'],
    highlighted: true
  },
  {
    name: 'Business',
    price: '99',
    description: 'للفرق والمتاجر المتنامية',
    features: ['كل مميزات Pro', 'تعديلات متقدمة', 'أتمتة متقدمة', 'ربط متعدد الحسابات'],
    highlighted: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-sm text-slate-400">الاشتراكات</p>
            <h1 className="text-2xl font-black">الباقات المتاحة</h1>
          </div>

          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200">
            <ArrowLeft size={16} /> العودة
          </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-3xl border p-6 ${plan.highlighted ? 'border-brand-400/50 bg-gradient-to-b from-brand-500/10 to-slate-900' : 'border-white/10 bg-white/5'}`}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-black">{plan.name}</h2>
                {plan.highlighted ? <Crown size={18} className="text-gold" /> : <Sparkles size={18} className="text-brand-200" />}
              </div>

              <div className="mb-5 flex items-end gap-2">
                <span className="text-4xl font-black">${plan.price}</span>
                <span className="pb-2 text-sm text-slate-400">/ شهر</span>
              </div>

              <p className="mb-5 text-sm text-slate-300">{plan.description}</p>

              <ul className="space-y-3 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300"><Check size={12} /></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`mt-6 w-full rounded-full px-4 py-3 font-bold ${plan.highlighted ? 'bg-gradient-to-r from-brand-500 to-gold text-slate-950' : 'border border-white/10 bg-white/5 text-white'}`}>
                {plan.name === 'Free' ? 'ابدأ مجاناً' : 'اختر الباقة'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

