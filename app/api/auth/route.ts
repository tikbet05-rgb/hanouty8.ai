import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body?.email || '').trim();
  const password = String(body?.password || '').trim();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: 'البريد الإلكتروني وكلمة المرور مطلوبان.' },
      { status: 400 }
    );
  }

  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        return NextResponse.json(
          { success: false, message: error.message || 'فشل تسجيل الدخول.' },
          { status: 401 }
        );
      }

      const response = NextResponse.json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح عبر Supabase.',
        email,
        user: data.user,
        requiresConsent: true,
        timestamp: new Date().toISOString()
      });

      response.cookies.set('ribh_session', 'authenticated', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });

      return response;
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'تعذر الاتصال بـ Supabase.' },
        { status: 500 }
      );
    }
  }

  const response = NextResponse.json({
    success: true,
    message: 'تم اعتماد الحساب التجريبي بنجاح. تم إنشاء جلسة داخل التطبيق.',
    email,
    plan: 'Pro',
    requiresConsent: true,
    timestamp: new Date().toISOString()
  });

  response.cookies.set('ribh_session', 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
