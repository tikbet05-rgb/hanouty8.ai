import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const email = body?.email || '';
  const password = body?.password || '';

  if (!email || !password) {
    return NextResponse.json({
      success: false,
      message: 'البريد الإلكتروني وكلمة المرور مطلوبان.'
    }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: 'تم اعتماد الحساب التجريبي بنجاح. ربط Supabase الحقيقي مطلوب لإدارة الجلسات الفعلية.',
    email,
    requiresConsent: true,
    plan: 'Pro',
    timestamp: new Date().toISOString()
  });
}

