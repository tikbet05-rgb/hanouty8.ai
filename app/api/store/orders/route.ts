import { NextResponse } from 'next/server';
import { getStoreAuth } from '@/lib/store-api';

export async function GET(request: Request) {
  const auth = await getStoreAuth(request);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!auth) return NextResponse.json({ error: configured ? 'Supabase sign-in required.' : 'Store database is not configured.' }, { status: configured ? 401 : 503 });

  const { data, error } = await auth.client
    .from('store_orders')
    .select('id,order_number,customer_name,customer_email,status,currency,subtotal,shipping_amount,tax_amount,total_amount,created_at,updated_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Unable to load orders.' }, { status: 500 });
  return NextResponse.json({ orders: data });
}

export async function POST(request: Request) {
  const auth = await getStoreAuth(request);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!auth) return NextResponse.json({ error: configured ? 'Supabase sign-in required.' : 'Store database is not configured.' }, { status: configured ? 401 : 503 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }); }

  const customerName = typeof body.customer_name === 'string' ? body.customer_name.trim() : '';
  const customerEmail = typeof body.customer_email === 'string' ? body.customer_email.trim() : '';
  const currency = typeof body.currency === 'string' ? body.currency.toUpperCase() : 'USD';
  const items = Array.isArray(body.items) ? body.items : [];

  if (!customerName || customerName.length > 160 || !/^\S+@\S+\.\S+$/.test(customerEmail) || customerEmail.length > 320)
    return NextResponse.json({ error: 'Valid customer name and email are required.' }, { status: 400 });
  if (!['MAD', 'USD', 'EUR', 'GBP'].includes(currency) || items.length < 1 || items.length > 50)
    return NextResponse.json({ error: 'Use a supported currency and 1–50 order items.' }, { status: 400 });

  const normalizedItems: Array<{ product_id: string; quantity: number }> = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') return NextResponse.json({ error: 'Invalid order item.' }, { status: 400 });
    const entry = item as Record<string, unknown>;
    const productId = typeof entry.product_id === 'string' ? entry.product_id : '';
    const quantity = Number(entry.quantity);
    if (!productId || !Number.isInteger(quantity) || quantity < 1 || quantity > 10000)
      return NextResponse.json({ error: 'Each item needs a product_id and positive integer quantity.' }, { status: 400 });
    normalizedItems.push({ product_id: productId, quantity });
  }

  const { data, error } = await auth.client
    .from('store_orders')
    .insert({
      owner_id: auth.userId,
      customer_name: customerName,
      customer_email: customerEmail,
      currency,
      status: 'pending',
      items: normalizedItems
    })
    .select('id,order_number,customer_name,customer_email,status,currency,subtotal,shipping_amount,tax_amount,total_amount,created_at')
    .single();

  if (error) return NextResponse.json({ error: 'Unable to create order. Run the migration and verify RLS.' }, { status: 500 });
  return NextResponse.json({ order: data, note: 'Pending order only. No payment or revenue recorded.' }, { status: 201 });
}
