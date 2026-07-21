import { NextResponse } from 'next/server';

export async function GET() {
  const timestamp = Date.now();
  
  return NextResponse.json({
    timestamp,
    timezone: 'Asia/Almaty',
    date: new Date(timestamp).toISOString()
  });
} 