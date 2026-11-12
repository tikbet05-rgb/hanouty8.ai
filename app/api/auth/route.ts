import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    message: 'Demo auth accepted. Connect Supabase for real account sign-in.',
    email: body?.email || null,
    requiresConsent: true,
    timestamp: new Date().toISOString()
  });
}
