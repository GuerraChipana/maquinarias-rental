'use client';

import { useState } from 'react';
import { maquinarias } from '@/data/maquinarias';
import { Maquina, CategoriaMaquina } from '@/types';

export default function AdminCatalogPage() {
  const [machines, setMachines] = useState<Maquina[]>(maquinarias);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    categoria: 'excavadora' as CategoriaMaquina,
    descripcion: '',
    imagen: '',
    disponible: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newMachine: Maquina = {
      id: form.id,
      nombre: form.nombre,
      categoria: form.categoria,
      descripcion: form.descripcion,
      imagen: form.imagen || '/images/machines/excavadora-cat-320.png',
      disponible: form.disponible,
      caracteristicas: ['Potencia alta', 'Cabina climatizada'],
      usos: ['Movimiento de tierras', 'Excavación general'],
    };
    setMachines([...machines, newMachine]);
    setForm({
      id: '',
      nombre: '',
      categoria: 'excavadora',
      descripcion: '',
      imagen: '',
      disponible: true,
    });
    setShowForm(false);
  };

  return (
    <section className="container mx-auto py-12 px-4 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Panel de Catálogo</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión rápida de equipos y unidades registradas</p>
        </div>
        <button
          className="px-5 py-2.5 bg-[#F5A623] hover:bg-[#e09418] text-[#040a12] font-black text-xs uppercase tracking-wider rounded shadow transition-colors"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Añadir Máquina'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="grid gap-3 mb-8 p-6 bg-slate-50 border border-slate-200 rounded-xl max-w-lg shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">Nuevo Equipo</h2>
          <input name="id" placeholder="ID único (ej: excavadora-320d)" value={form.id} onChange={handleChange} required className="p-2.5 border rounded text-sm bg-white" />
          <input name="nombre" placeholder="Nombre comercial" value={form.nombre} onChange={handleChange} required className="p-2.5 border rounded text-sm bg-white" />
          <select name="categoria" value={form.categoria} onChange={handleChange} className="p-2.5 border rounded text-sm bg-white">
            <option value="excavadora">Excavadora</option>
            <option value="compactadora">Compactadora</option>
            <option value="tractor">Tractor</option>
            <option value="grua">Grúa</option>
            <option value="camion-cisterna">Camión Cisterna</option>
            <option value="retroexcavadora">Retroexcavadora</option>
            <option value="volquete">Volquete</option>
          </select>
          <input name="descripcion" placeholder="Descripción breve" value={form.descripcion} onChange={handleChange} required className="p-2.5 border rounded text-sm bg-white" />
          <input name="imagen" placeholder="Ruta imagen (/images/machines/...)" value={form.imagen} onChange={handleChange} className="p-2.5 border rounded text-sm bg-white" />
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange} className="rounded" />
            Disponible para alquiler inmediato
          </label>
          <button type="submit" className="mt-3 px-4 py-2.5 bg-[#071324] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#0e2140] transition-colors">
            Guardar en listado
          </button>
        </form>
      )}

      <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
        <table className="min-w-full table-auto divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-left">Disponibilidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {machines.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{m.id}</td>
                <td className="px-4 py-3 font-bold text-slate-900">{m.nombre}</td>
                <td className="px-4 py-3 capitalize text-slate-600">{m.categoria}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${m.disponible ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {m.disponible ? 'Disponible' : 'En obra'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
