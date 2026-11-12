import { ArrowLeft, Search, Sparkles, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

const suggestions = [
  'ابحث عن منتجات منزلية عالية الطلب مع تعليقات جيدة.',
  'حلّل فرص متجر بيع أزياء ومستلزمات أطفال.',
  'أنشئ وصفًا احترافيًا وفيديو قصير للمنتج.',
  'اقترح صفحة مبيعات مع CTA واضح.',
  'استعرض مصدر زيارات بديل لبناء متجر سريع.'
];

const marketCards = [
  { title: 'Amazon', opportunity: 'ربح متوقع 28%', volume: '1.4K طلبات' },
  { title: 'AliExpress', opportunity: 'ربح متوقع 34%', volume: '2.1K طلبات' },
  { title: 'Shopify', opportunity: 'ربح متوقع 31%', volume: '880 متجر' },
  { title: 'Etsy', opportunity: 'ربح متوقع 26%', volume: '720 منتج' }
];

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-sm text-slate-400">RIBH AI Assistant</p>
            <h1 className="text-2xl font-black">المساعد الذكي</h1>
          </div>

          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200">
            <ArrowLeft size={16} /> العودة للوحة
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-brand-500/15 p-3 text-brand-200">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-400">مستوى التشغيل</p>
                <p className="font-bold">نشط مع موافقة المستخدم</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {suggestions.map((item) => (
                <button key={item} className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-3 text-right text-sm text-slate-200 transition hover:border-brand-400/40">
                  {item}
                </button>
              ))}
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center gap-2 text-brand-200">
                <Search size={18} />
                <span className="font-semibold">طلب جديد</span>
              </div>

              <textarea
                className="min-h-[180px] w-full resize-none rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-right text-slate-100 outline-none ring-0 placeholder:text-slate-500"
                placeholder="اكتب طلبك مثل: ابحث عن منتج صغير مناسب للسوق العربي مع هامش ربح 30% وبدء بأقل رأس مال..."
              />

              <div className="mt-4 flex flex-wrap justify-between gap-3">
                <button className="rounded-full bg-gradient-to-r from-brand-500 to-gold px-5 py-2.5 font-bold text-slate-950">
                  تحليل الطلب
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Zap size={14} className="text-yellow-300" />
                  يتطلب موافقة قبل أي شراء أو نشر
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">أفضل الفرص</h2>
                <TrendingUp size={18} className="text-emerald-300" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {marketCards.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white">{item.title}</p>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                        {item.opportunity}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-400">{item.volume}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
