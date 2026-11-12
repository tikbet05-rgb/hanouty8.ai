import Link from 'next/link';
import { ArrowRight, BrainCircuit, Globe2, Rocket, ShieldCheck } from 'lucide-react';

const heroMetrics = [
  { label: 'المستخدمين النشطين', value: '42.4K' },
  { label: 'العمولات الشهرية', value: '+$183K' },
  { label: 'المنتجات المحللة', value: '18.2K' }
];

const features = [
  {
    title: 'المساعد الذكي',
    description: 'يحلل السوق، يقترح المشاريع، ويكتب نصوص التسويق قبل التنفيذ.',
    icon: BrainCircuit
  },
  {
    title: 'الأسواق العالمية',
    description: 'بحث في Amazon وAliExpress وShopify وEtsy وeBay مع تحليل الربح.',
    icon: Globe2
  },
  {
    title: 'التشغيل الآمن',
    description: 'يطلب موافقة المستخدم قبل الشراء، النشر، أو التغييرات الحساسة.',
    icon: ShieldCheck
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto max-w-7xl px-6 py-6">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-gold text-lg font-bold text-white">
              R
            </div>
            <div>
              <p className="text-lg font-bold">RIBH AI</p>
            </div>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white">لوحة التحكم</Link>
            <Link href="/assistant" className="text-sm text-slate-300 hover:text-white">المساعد</Link>
            <Link href="/markets" className="text-sm text-slate-300 hover:text-white">الأسواق</Link>
            <Link href="/pricing" className="text-sm text-slate-300 hover:text-white">الاشتراكات</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth" className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-brand-400 hover:text-white">
              تسجيل الدخول
            </Link>
            <Link href="/dashboard" className="rounded-full bg-gradient-to-r from-brand-500 to-gold px-4 py-2 text-sm font-semibold text-slate-950">
              ابدأ الآن
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-sm text-brand-200">
              <Rocket size={16} />
              MVP المرحلة الأولى
            </div>

            <h1 className="max-w-xl text-4xl font-black leading-tight text-white md:text-6xl">
              منصة ذكية عالمية للتعلم والربح عبر الذكاء الاصطناعي.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              أنشئ متجرًا، ابحث عن فرص التسويق بالعمولة، أنشئ محتوى، وأدر الأرباح من لوحة واحدة تفاعلية.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-gold px-6 py-3 font-bold text-slate-950 shadow-glow">
                تجربة لوحة التحكم <ArrowRight size={18} />
              </Link>
              <Link href="/assistant" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:border-brand-300">
                جرّب المساعد
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {heroMetrics.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-400/40 bg-gradient-to-br from-brand-500/15 via-slate-900 to-purple-900 p-6 shadow-glow">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">RIBH AI Assistant</p>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                  Online
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  <p className="text-xs text-brand-200">طلب المستخدم</p>
                  <p className="mt-2">أريد مشروعًا مناسبًا في السوق العربي مع هامش ربح 35%.</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-200">
                  <p className="text-xs text-emerald-300">توصية المساعد</p>
                  <p className="mt-2">أقترح: أزياء منزلية – 3.4x ROAS – طلب موافقة قبل النشر.</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-dashed border-brand-400/40 p-4 text-sm text-slate-300">
                تحليل سريع: الطلب الحالي 18% أعلى من المتوسط ، والربح المتوقع 39% مع 13 يومًا لتقليل التكاليف.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">مراحل المشروع</h2>
          <span className="rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-sm text-brand-200">
            Phase 1 MVP
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/30 to-gold/40 text-brand-100">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

