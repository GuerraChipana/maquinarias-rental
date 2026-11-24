"use server";

import { revalidatePath, updateTag } from "next/cache";
import { Maquina, CategoriaItem } from "@/types";
import {
  maquinarias as baseLocal,
  categorias as categoriasLocal,
} from "@/data/maquinarias";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || "";

interface RawCategoryRow {
  id?: unknown;
  nombre?: unknown;
  label?: unknown;
}

interface RawMachineryRow {
  id?: unknown;
  nombre?: unknown;
  categoria?: unknown;
  categoriaid?: unknown;
  descripcion?: unknown;
  imagen?: unknown;
  imagenurl?: unknown;
  disponible?: unknown;
  destacada?: unknown;
  destacado?: unknown;
  caracteristicas?: unknown;
  usos?: unknown;
}

interface AppsScriptResponse {
  status?: unknown;
  categories?: RawCategoryRow[];
  machinery?: RawMachineryRow[];
  categorias?: RawCategoryRow[];
  maquinaria?: RawMachineryRow[];
}

function parsePipeList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (!value) return [];
  return String(value)
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function invalidateCatalogCache() {
  updateTag("maquinaria");
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/catalogo/[category]", "page");
}

export async function getMaquinariasHibrido(): Promise<{
  categorias: CategoriaItem[];
  maquinaria: Maquina[];
}> {
  if (!SCRIPT_URL) {
    return { categorias: categoriasLocal, maquinaria: baseLocal };
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      next: { revalidate: 60, tags: ["maquinaria"] },
    });

    if (!res.ok) throw new Error("Failed to connect to Google Sheets API");

    const data: AppsScriptResponse | RawMachineryRow[] = await res.json();

    let rawCategories: RawCategoryRow[] = [];
    let rawMachinery: RawMachineryRow[] = [];

    if (Array.isArray(data)) {
      rawMachinery = data;
    } else if (data && typeof data === "object") {
      if (data.status === "success" && Array.isArray(data.machinery)) {
        rawCategories = data.categories || [];
        rawMachinery = data.machinery;
      } else if (Array.isArray(data.maquinaria)) {
        rawCategories = data.categorias || [];
        rawMachinery = data.maquinaria;
      }
    }

    if (rawMachinery.length > 0) {
      const parsedCategories: CategoriaItem[] = rawCategories
        .map((c) => ({
          id: String(c.id || "").trim(),
          label: String(c.nombre || c.label || "").trim(),
        }))
        .filter((c) => c.id.length > 0 && c.label.length > 0);

      const parsedMachinery: Maquina[] = rawMachinery.map((m, index) => ({
        id: String(m.id || `eq-${index}`).trim(),
        nombre: String(m.nombre || "").trim(),
        categoria: String(m.categoria || m.categoriaid || "general").trim(),
        descripcion: String(m.descripcion || "").trim(),
        imagen: String(
          m.imagen || m.imagenurl || "/images/machines/excavadora.webp",
        ).trim(),
        disponible: String(m.disponible).toUpperCase() !== "FALSE",
        destacada: String(m.destacada ?? m.destacado).toUpperCase() === "TRUE",
        caracteristicas: parsePipeList(m.caracteristicas),
        usos: parsePipeList(m.usos),
      }));

      return {
        categorias:
          parsedCategories.length > 0 ? parsedCategories : categoriasLocal,
        maquinaria: parsedMachinery.length > 0 ? parsedMachinery : baseLocal,
      };
    }

    return { categorias: categoriasLocal, maquinaria: baseLocal };
  } catch (err) {
    console.error("Error leyendo JSON del Spreadsheet:", err);
    return { categorias: categoriasLocal, maquinaria: baseLocal };
  }
}

async function postToAppsScript(payload: Record<string, unknown>): Promise<boolean> {
  const authorized = await isAdminAuthenticated();
  if (!authorized) {
    console.warn("Intento no autorizado de mutación en catálogo.");
    return false;
  }

  if (!SCRIPT_URL) return false;

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Apps Script respondió con estado ${res.status}`);
    }

    invalidateCatalogCache();
    return true;
  } catch (err) {
    console.error("Error en operación de Google Sheets:", err);
    return false;
  }
}

export async function addMaquinaDb(maquina: Maquina) {
  return postToAppsScript({ action: "add", data: maquina });
}

export async function toggleDisponibleDb(id: string) {
  return postToAppsScript({ action: "toggle", id });
}

export async function deleteMaquinaDb(id: string) {
  return postToAppsScript({ action: "delete", id });
}

export async function addCategoriaDb(categoria: {
  id: string;
  nombre: string;
  orden: number;
}) {
  return postToAppsScript({ action: "add_categoria", data: categoria });
}
