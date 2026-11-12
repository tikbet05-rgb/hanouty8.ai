import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    user: {
      id: 'user_123',
      name: 'Mohamed Issou',
      email: 'mohamed@ribh.ai',
      plan: 'Pro',
      locale: 'ar',
      status: 'active',
      nextBilling: '2026-12-15',
      balance: 2480
    }
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    message: 'تم تحديث الملف الشخصي بنجاح.',
    updated: body
  });
}

