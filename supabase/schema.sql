import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    plans: [
      { name: 'Free', price: 0, features: ['مساعد محدود', 'لوحة تحكم أساسية'] },
      { name: 'Pro', price: 49, features: ['المساعد الكامل', 'إدارة الأسواق', 'تقارير يومية'] },
      { name: 'Business', price: 99, features: ['جميع ميزات Pro', 'أتمتة متقدمة', 'ربط متعدد الحسابات'] }
    ],
    activePlan: 'Pro',
    nextBilling: '2026-12-15'
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    message: 'تم تحديث الاشتراك بنجاح.',
    selectedPlan: body?.plan || 'Pro',
    requiresConsent: true,
    timestamp: new Date().toISOString()
  });
}

