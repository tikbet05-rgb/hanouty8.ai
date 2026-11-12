import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'RIBH AI API',
    phase: 'MVP',
    timestamp: new Date().toISOString(),
    features: ['auth', 'dashboard', 'assistant', 'markets', 'admin']
  });
}
