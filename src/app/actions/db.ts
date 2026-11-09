"use server";

import { Maquina, CategoriaItem } from "@/types";
import {
  maquinarias as baseLocal,
  categorias as categoriasLocal,
} from "@/data/maquinarias";

const SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || "";

export async function getMaquinariasHibrido(): Promise<{
  categorias: CategoriaItem[];
  maquinaria: Maquina[];
}> {
  if (!SCRIPT_URL)
    return { categorias: categoriasLocal, maquinaria: baseLocal };

  try {
    // Usamos caché controlada nativa de Next.js de 60 segundos para velocidad sin romper componentes de cliente
    const res = await fetch(SCRIPT_URL, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) throw new Error("Failed to connect to Google Sheets API");

    const data = await res.json();

    const isSuccessWrapper = data.status === "success" && data.machinery;
    const isDirectObject = data.maquinaria && Array.isArray(data.maquinaria);
    
    let rawCategories = [];
    let rawMachinery = [];

    if (isSuccessWrapper) {
       rawCategories = data.categories || [];
       rawMachinery = data.machinery || [];
    } else if (isDirectObject) {
       rawCategories = data.categorias || [];
       rawMachinery = data.maquinaria || [];
    } else if (Array.isArray(data)) {
       rawMachinery = data;
    }

    if (rawMachinery.length > 0) {
      const parsedCategories = rawCategories.map((c: any) => ({
        id: String(c.id || "").trim(),
        label: String(c.nombre || c.label || "").trim(),
      }));

      const parsedMachinery = rawMachinery.map((m: any, index: number) => ({
        id: String(m.id || `eq-${index}`),
        nombre: String(m.nombre || ""),
        categoria: String(m.categoria || m.categoriaid || "general"),
        descripcion: String(m.descripcion || ""),
        imagen: String(m.imagen || m.imagenurl || "/images/placeholder.jpg").trim(),
        disponible: String(m.disponible).toUpperCase() !== "FALSE",
        destacada: String(m.destacada || m.destacado).toUpperCase() === "TRUE",
        caracteristicas: m.caracteristicas
          ? String(m.caracteristicas).split("|").map((s: string) => s.trim()).filter(Boolean)
          : [],
        usos: m.usos
          ? String(m.usos).split("|").map((s: string) => s.trim()).filter(Boolean)
          : [],
      }));

      return {
        categorias: parsedCategories.length > 0 ? parsedCategories : categoriasLocal,
        maquinaria: parsedMachinery.length > 0 ? parsedMachinery : baseLocal,
      };
    }

    return { categorias: categoriasLocal, maquinaria: baseLocal };
  } catch (err) {
    console.error("Error leyendo JSON del Spreadsheet:", err);
    return { categorias: categoriasLocal, maquinaria: baseLocal };
  }
}

export async function addMaquinaDb(maquina: Maquina) {
  if (!SCRIPT_URL) return false;
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "add", data: maquina }),
    });
    return true;
  } catch (err) {
    console.error("Error adding machinery:", err);
    return false;
  }
}

export async function toggleDisponibleDb(id: string) {
  if (!SCRIPT_URL) return false;
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "toggle", id }),
    });
    return true;
  } catch (err) {
    console.error("Error toggling availability status:", err);
    return false;
  }
}

export async function deleteMaquinaDb(id: string) {
  if (!SCRIPT_URL) return false;
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "delete", id }),
    });
    return true;
  } catch (err) {
    console.error("Error deleting machinery entry:", err);
    return false;
  }
}

export async function addCategoriaDb(categoria: { id: string; nombre: string; orden: number }) {
  if (!SCRIPT_URL) return false;
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "add_categoria", data: categoria }),
    });
    return true;
  } catch (err) {
    console.error("Error adding category:", err);
    return false;
  }
}