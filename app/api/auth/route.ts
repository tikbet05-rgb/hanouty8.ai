import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body?.email || '').trim();
  const password = String(body?.password || '').trim();

  if (!email || !password) {
    return NextResponse.json(
      {
        success: false,
        message: 'البريد الإلكتروني وكلمة المرور مطلوبان.'
      },
      { status: 400 }
    );
  }

  const res = NextResponse.json({
    success: true,
    message: 'تم اعتماد الحساب التجريبي بنجاح. تم إنشاء جلسة داخل التطبيق.',
    email,
    plan: 'Pro',
    requiresConsent: true,
    timestamp: new Date().toISOString()
  });

  res.cookies.set('ribh_session', 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return res;
}
