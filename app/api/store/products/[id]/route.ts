import { NextResponse } from 'next/server';
import { getStoreAuth } from '@/lib/store-api';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const auth = await getStoreAuth(request);
  if (!auth) return NextResponse.json({ error: configured ? 'Supabase sign-in required.' : 'Store database is not configured.' }, { status: configured ? 401 : 503 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }); }

  const updates: Record<string, string | number | null> = {};
  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || !body.name.trim() || body.name.trim().length > 160) return NextResponse.json({ error: 'Invalid product name.' }, { status: 400 });
    updates.name = body.name.trim();
  }
  if (body.description !== undefined) {
    if (body.description !== null && typeof body.description !== 'string') return NextResponse.json({ error: 'Invalid description.' }, { status: 400 });
    updates.description = typeof body.description === 'string' ? body.description.slice(0, 5000) : null;
  }
  if (body.sku !== undefined) {
    if (body.sku !== null && typeof body.sku !== 'string') return NextResponse.json({ error: 'Invalid SKU.' }, { status: 400 });
    updates.sku = typeof body.sku === 'string' ? body.sku.trim().slice(0, 80) || null : null;
  }
  if (body.price !== undefined) {
    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0) return NextResponse.json({ error: 'Price must be non-negative.' }, { status: 400 });
    updates.price = price;
  }
  if (body.stock_quantity !== undefined) {
    const stock = Number(body.stock_quantity);
    if (!Number.isInteger(stock) || stock < 0) return NextResponse.json({ error: 'Stock must be a non-negative whole number.' }, { status: 400 });
    updates.stock_quantity = stock;
  }
  if (body.currency !== undefined) {
    const currency = String(body.currency).toUpperCase();
    if (!['MAD', 'USD', 'EUR', 'GBP'].includes(currency)) return NextResponse.json({ error: 'Unsupported currency.' }, { status: 400 });
    updates.currency = currency;
  }
  if (body.status !== undefined) {
    const status = String(body.status);
    if (!['draft', 'active', 'archived'].includes(status)) return NextResponse.json({ error: 'Status must be draft, active, or archived.' }, { status: 400 });
    updates.status = status;
  }
  if (!Object.keys(updates).length) return NextResponse.json({ error: 'No product fields to update.' }, { status: 400 });

  const { data, error } = await auth.client.from('store_products').update(updates).eq('id', params.id)
    .select('id,name,description,sku,price,currency,stock_quantity,status,created_at,updated_at').maybeSingle();
  if (error) return NextResponse.json({ error: 'Unable to update product.' }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  return NextResponse.json({ product: data });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const auth = await getStoreAuth(request);
  if (!auth) return NextResponse.json({ error: configured ? 'Supabase sign-in required.' : 'Store database is not configured.' }, { status: configured ? 401 : 503 });

  const { data, error } = await auth.client.from('store_products').delete().eq('id', params.id).select('id').maybeSingle();
  if (error) return NextResponse.json({ error: 'Unable to delete product.' }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  return NextResponse.json({ success: true });
}
