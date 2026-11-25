import { NextResponse } from 'next/server';
import { getStoreAuth } from '@/lib/store-api';

const statusForFailure = (configured: boolean) => configured ? 401 : 503;
const failureMessage = (configured: boolean) => configured ? 'Supabase sign-in required.' : 'Store database is not configured.';

export async function GET(request: Request) {
  const auth = await getStoreAuth(request);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!auth) return NextResponse.json({ error: failureMessage(configured) }, { status: statusForFailure(configured) });

  const { data, error } = await auth.client
    .from('store_products')
    .select('id,name,description,sku,price,currency,stock_quantity,status,created_at,updated_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Unable to load products.' }, { status: 500 });
  return NextResponse.json({ products: data });
}

export async function POST(request: Request) {
  const auth = await getStoreAuth(request);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!auth) return NextResponse.json({ error: failureMessage(configured) }, { status: statusForFailure(configured) });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }); }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const price = Number(body.price);
  const stock = Number(body.stock_quantity ?? 0);
  const currency = typeof body.currency === 'string' ? body.currency.toUpperCase() : 'USD';

  if (!name || name.length > 160 || !Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0)
    return NextResponse.json({ error: 'Provide a valid name, non-negative price, and whole-number stock.' }, { status: 400 });
  if (!['MAD', 'USD', 'EUR', 'GBP'].includes(currency))
    return NextResponse.json({ error: 'Currency must be MAD, USD, EUR, or GBP.' }, { status: 400 });

  const { data, error } = await auth.client
    .from('store_products')
    .insert({
      owner_id: auth.userId,
      name,
      description: typeof body.description === 'string' ? body.description.slice(0, 5000) : null,
      sku: typeof body.sku === 'string' ? body.sku.trim().slice(0, 80) || null : null,
      price,
      currency,
      stock_quantity: stock,
      status: 'draft'
    })
    .select('id,name,description,sku,price,currency,stock_quantity,status,created_at,updated_at')
    .single();

  if (error) return NextResponse.json({ error: 'Unable to create product. Run the store migration and verify RLS.' }, { status: 500 });
  return NextResponse.json({ product: data }, { status: 201 });
}
