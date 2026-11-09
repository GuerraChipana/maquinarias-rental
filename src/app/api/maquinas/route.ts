import { NextResponse } from 'next/server';
import { getMaquinariasHibrido } from '@/app/actions/db';

// ESTA LÍNEA ES CLAVE: Fuerza a Next.js a no cachear esta ruta en Vercel
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getMaquinariasHibrido();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve equipment catalog' },
      { status: 500 }
    );
  }
}