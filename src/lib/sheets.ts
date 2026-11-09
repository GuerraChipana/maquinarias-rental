import { maquinarias as baseLocal } from '@/data/maquinarias';
import { Maquina, CategoriaMaquina } from '@/types';

function parseCSV(csvText: string): Maquina[] {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const results: Maquina[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    
    if (currentline.length >= headers.length) {
      const obj: any = {};
      for (let j = 0; j < headers.length; j++) {
        let val = currentline[j] ? currentline[j].replace(/^"|"$/g, '').trim() : '';
        obj[headers[j]] = val;
      }
      
      results.push({
        id: obj.id || `maq-${i}`,
        nombre: obj.nombre || 'Sin nombre',
        categoria: (obj.categoria || 'excavadora') as CategoriaMaquina,
        descripcion: obj.descripcion || '',
        imagen: obj.imagen || '/images/machines/excavadora.webp',
        disponible: String(obj.disponible).toUpperCase() === 'TRUE',
        destacada: String(obj.destacada).toUpperCase() === 'TRUE',
        caracteristicas: obj.caracteristicas ? obj.caracteristicas.split('|').map((s: string) => s.trim()) : [],
        usos: obj.usos ? obj.usos.split('|').map((s: string) => s.trim()) : [],
      });
    }
  }
  return results;
}

export async function getMaquinasHibrido(): Promise<Maquina[]> {
  const csvUrl = process.env.SHEETS_CSV_URL;

  if (!csvUrl) {
    console.warn("No hay URL de Sheets configurada, usando datos locales.");
    return baseLocal;
  }

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error("Fallo al cargar el CSV");
    
    const csvText = await response.text();
    const maquinas = parseCSV(csvText);
    
    if (maquinas.length === 0) return baseLocal;
    return maquinas;
    
  } catch (error) {
    console.error("Error leyendo Sheets CSV, usando respaldo local:", error);
    return baseLocal;
  }
}