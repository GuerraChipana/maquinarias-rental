import { NextResponse } from 'next/server';
import { getMaquinasHibrido } from '@/lib/sheets';

export async function GET() {
  try {
    const maquinas = await getMaquinasHibrido();
    return NextResponse.json(maquinas, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    console.error('API Error /api/maquinas:', error);
    return NextResponse.json(
      { error: 'Error al obtener el catálogo de máquinas' },
      { status: 500 }
    );
  }
}