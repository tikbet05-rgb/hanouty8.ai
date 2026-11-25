'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, LoaderCircle, PackagePlus, RefreshCw, Store, Trash2 } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

type Product = {
  id: string;
  name: string;
  description: string | null;
  sku: string | null;
  price: number;
  currency: string;
  stock_quantity: number;
  status: 'draft' | 'active' | 'archived';
  created_at: string;
};

type Order = {
  id: string;
  order_number: number;
  customer_name: string;
  customer_email: string;
  status: string;
  currency: string;
  total_amount: number;
  created_at: string;
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('MAD');
  const [stock, setStock] = useState('0');
  const [description, setDescription] = useState('');

  const accessToken = useCallback(async () => {
    const client = getSupabaseClient();
    if (!client) return null;
    const { data, error: sessionError } = await client.auth.getSession();
    if (sessionError) throw sessionError;
    return data.session?.access_token ?? null;
  }, []);

  const request = useCallback(async (path: string, init?: RequestInit) => {
    const token = await accessToken();
    if (!token) throw new Error('سجّل الدخول عبر Supabase أولًا لعرض بيانات المتجر.');
    const response = await fetch(path, {
      ...init,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...init?.headers }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'تعذر إكمال الطلب.');
    return result;
  }, [accessToken]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [productResult, orderResult] = await Promise.all([
        request('/api/store/products'),
        request('/api/store/orders')
      ]);
      setProducts(productResult.products || []);
      setOrders(orderResult.orders || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'تعذر تحميل بيانات المتجر.');
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => { void refresh(); }, [refresh]);

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNotice('');
    setError('');
    try {
      await request('/api/store/products', {
        method: 'POST',
        body: JSON.stringify({ name, sku, price: Number(price), currency, stock_quantity: Number(stock), description })
      });
      setName(''); setSku(''); setPrice(''); setStock('0'); setDescription('');
      setNotice('تمت إضافة المنتج كمسودة. لم يتم نشره في متجر خارجي.');
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'تعذر إضافة المنتج.');
    } finally {
      setSubmitting(false);
    }
  }

  async function archiveProduct(product: Product) {
    setError(''); setNotice('');
    try {
      await request(`/api/store/products/${product.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: product.status === 'archived' ? 'draft' : 'archived' })
      });
      setNotice(product.status === 'archived' ? 'أعيد المنتج إلى المسودات.' : 'تمت أرشفة المنتج.');
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'تعذر تحديث المنتج.');
    }
  }

  async function deleteProduct(product: Product) {
    if (!window.confirm(`هل تريد حذف المنتج «${product.name}»؟`)) return;
    setError(''); setNotice('');
    try {
      await request(`/api/store/products/${product.id}`, { method: 'DELETE' });
      setNotice('تم حذف المنتج.');
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'تعذر حذف المنتج.');
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-6" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-500/15 p-3 text-brand-200"><Store size={22} /></div>
            <div><p className="text-sm text-slate-400">إدارة النشاط التجاري</p><h1 className="text-2xl font-black">المتجر والطلبات</h1></div>
          </div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200"><ArrowRight size={16} /> لوحة التحكم</Link>
        </header>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2" role="tablist" aria-label="أقسام المتجر">
            <button role="tab" aria-selected={tab === 'products'} onClick={() => setTab('products')} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === 'products' ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300'}`}>المنتجات ({products.length})</button>
            <button role="tab" aria-selected={tab === 'orders'} onClick={() => setTab('orders')} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === 'orders' ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300'}`}>الطلبات ({orders.length})</button>
          </div>
          <button onClick={() => void refresh()} disabled={loading} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 disabled:opacity-50"><RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> تحديث</button>
        </div>

        <div className="mb-6 rounded-2xl border border-amber-400/25 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
          الطلبات المنشأة هنا معلقة فقط؛ لا تتم المدفوعات أو عمليات النشر، ولا تُحتسب إيرادات قبل ربط مزود موثوق والتحقق من Webhook.
        </div>
        {notice && <p role="status" className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">{notice}</p>}
        {error && <p role="alert" className="mb-4 rounded-xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}

        {tab === 'products' && <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="mb-4 text-lg font-bold">قائمة المنتجات</h2>
            {loading ? <div className="flex items-center gap-2 py-8 text-slate-400"><LoaderCircle className="animate-spin" size={18} /> جارٍ التحميل…</div> : products.length === 0 ? <p className="py-8 text-sm text-slate-400">لا توجد منتجات بعد. أضف منتجك الأول.</p> :
              <div className="space-y-3">{products.map((product) => <article key={product.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="min-w-0"><h3 className="font-bold">{product.name}</h3><p className="mt-1 text-sm text-slate-400">{product.sku || 'بدون رمز'} · المخزون: {product.stock_quantity} · {Number(product.price).toFixed(2)} {product.currency}</p><span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{product.status === 'draft' ? 'مسودة' : product.status === 'active' ? 'نشط' : 'مؤرشف'}</span></div>
                <div className="flex gap-2"><button onClick={() => void archiveProduct(product)} className="rounded-full border border-white/15 px-3 py-2 text-xs hover:bg-white/10">{product.status === 'archived' ? 'استعادة' : 'أرشفة'}</button><button aria-label={`حذف ${product.name}`} onClick={() => void deleteProduct(product)} className="rounded-full border border-rose-400/20 p-2 text-rose-200 hover:bg-rose-500/10"><Trash2 size={16} /></button></div>
              </article>)}</div>}
          </section>

          <form onSubmit={createProduct} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold"><PackagePlus size={19} className="text-brand-200" /> إضافة منتج</h2>
            <label className="block text-sm text-slate-300">اسم المنتج<input required maxLength={160} value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-white" /></label>
            <label className="block text-sm text-slate-300">رمز المنتج<input maxLength={80} value={sku} onChange={(e) => setSku(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-white" /></label>
            <div className="grid grid-cols-2 gap-3"><label className="block text-sm text-slate-300">السعر<input required min="0" step="0.01" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-white" /></label><label className="block text-sm text-slate-300">العملة<select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-white"><option>MAD</option><option>USD</option><option>EUR</option><option>GBP</option></select></label></div>
            <label className="block text-sm text-slate-300">الكمية في المخزون<input required min="0" step="1" type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-white" /></label>
            <label className="block text-sm text-slate-300">الوصف<textarea maxLength={5000} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-white" /></label>
            <button disabled={submitting} className="w-full rounded-xl bg-gradient-to-r from-brand-500 to-gold px-4 py-3 font-bold text-slate-950 disabled:opacity-50">{submitting ? 'جارٍ الحفظ…' : 'حفظ كمسودة'}</button>
          </form>
        </div>}

        {tab === 'orders' && <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="mb-4 text-lg font-bold">الطلبات — لا توجد حالة مدفوعة من هذا النظام</h2>
          {loading ? <div className="flex items-center gap-2 py-8 text-slate-400"><LoaderCircle className="animate-spin" size={18} /> جارٍ التحميل…</div> : orders.length === 0 ? <p className="py-8 text-sm text-slate-400">لا توجد طلبات.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-right text-sm"><thead className="text-slate-400"><tr><th className="p-3">رقم الطلب</th><th className="p-3">العميل</th><th className="p-3">الحالة</th><th className="p-3">الإجمالي</th><th className="p-3">التاريخ</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t border-white/10"><td className="p-3">#{order.order_number}</td><td className="p-3">{order.customer_name}<br /><span className="text-xs text-slate-400">{order.customer_email}</span></td><td className="p-3"><span className="rounded-full bg-amber-500/10 px-2 py-1 text-amber-200">{order.status === 'pending' ? 'معلق' : order.status}</span></td><td className="p-3">{Number(order.total_amount).toFixed(2)} {order.currency}</td><td className="p-3">{new Date(order.created_at).toLocaleDateString('ar')}</td></tr>)}</tbody></table></div>}
        </section>}
      </div>
    </main>
  );
}
