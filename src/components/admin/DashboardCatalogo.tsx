'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus, Eye, Tractor, CheckCircle2, AlertTriangle, Trash2, Search, HardHat, Loader2, RefreshCw, X, Layers
} from 'lucide-react';
import { Maquina, CategoriaMaquina } from '@/types';
import { getMaquinariasHibrido, addMaquinaDb, deleteMaquinaDb, toggleDisponibleDb, addCategoriaDb } from '@/app/actions/db';

interface DashboardCatalogoProps {
  onLogout: () => void;
}

export default function DashboardCatalogo({ onLogout }: DashboardCatalogoProps) {
  const [machines, setMachines] = useState<Maquina[]>([]);
  const [categoriasList, setCategoriasList] = useState<{ id: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCatForm, setShowCatForm] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');

  // Estado del formulario de Maquinaria
  const [form, setForm] = useState({
    id: '', nombre: '', categoria: 'excavadora', descripcion: '',
    imagen: '', disponible: true, destacada: false,
  });

  // Listas dinámicas individuales para Características y Usos
  const [caracteristicas, setCaracteristicas] = useState<string[]>(['']);
  const [usos, setUsos] = useState<string[]>(['']);

  // Estado para crear nueva Categoría
  const [nuevaCat, setNuevaCat] = useState({ id: '', nombre: '' });

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const data = await getMaquinariasHibrido();
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        setMachines(data.maquinaria || []);
        setCategoriasList(data.categorias || []);
      } else if (Array.isArray(data)) {
        setMachines(data);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  // Manejadores dinámicos para Características
  const handleCaracChange = (index: number, value: string) => {
    const updated = [...caracteristicas];
    updated[index] = value;
    setCaracteristicas(updated);
  };
  const addCaracField = () => setCaracteristicas([...caracteristicas, '']);
  const removeCaracField = (index: number) => setCaracteristicas(caracteristicas.filter((_, i) => i !== index));

  // Manejadores dinámicos para Usos
  const handleUsoChange = (index: number, value: string) => {
    const updated = [...usos];
    updated[index] = value;
    setUsos(updated);
  };
  const addUsoField = () => setUsos([...usos, '']);
  const removeUsoField = (index: number) => setUsos(usos.filter((_, i) => i !== index));

  const handleAddCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaCat.id || !nuevaCat.nombre) return;
    const catIdClean = nuevaCat.id.trim().toLowerCase().replace(/\s+/g, '-');
    const catPayload = {
      id: catIdClean,
      nombre: nuevaCat.nombre.trim(),
      orden: categoriasList.length + 1
    };

    setCategoriasList([...categoriasList, { id: catPayload.id, label: catPayload.nombre }]);
    setNuevaCat({ id: '', nombre: '' });
    setShowCatForm(false);

    await addCategoriaDb(catPayload);
    loadData();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.nombre) return;

    const newMachine: Maquina = {
      id: form.id.trim().toLowerCase().replace(/\s+/g, '-'),
      nombre: form.nombre.trim(),
      categoria: form.categoria as CategoriaMaquina, // <-- AQUÍ ESTÁ LA SOLUCIÓN
      descripcion: form.descripcion.trim(),
      imagen: form.imagen.trim() || '/images/machines/excavadora.webp',
      disponible: form.disponible,
      destacada: form.destacada,
      caracteristicas: caracteristicas.filter(s => s.trim() !== ''),
      usos: usos.filter(s => s.trim() !== ''),
    };

    setMachines([newMachine, ...machines]);
    setForm({ id: '', nombre: '', categoria: 'excavadora', descripcion: '', imagen: '', disponible: true, destacada: false });
    setCaracteristicas(['']);
    setUsos(['']);
    setShowForm(false);
    
    await addMaquinaDb(newMachine);
  };
  const handleToggleDisponible = async (id: string) => {
    setMachines(machines.map(m => m.id === id ? { ...m, disponible: !m.disponible } : m));
    await toggleDisponibleDb(id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Deseas eliminar permanentemente esta maquinaria?')) {
      setMachines(machines.filter(m => m.id !== id));
      await deleteMaquinaDb(id);
    }
  };

  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      const matchCat = categoriaFiltro === 'todas' || m.categoria === categoriaFiltro;
      const matchSearch = m.nombre.toLowerCase().includes(busqueda.toLowerCase()) || m.id.toLowerCase().includes(busqueda.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [machines, categoriaFiltro, busqueda]);

  const totalDisponibles = machines.filter((m) => m.disponible).length;
  const totalEnObra = machines.length - totalDisponibles;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#071324] text-white/50 font-mono text-xs uppercase tracking-widest">
        <Loader2 size={32} className="animate-spin text-[#F5A623] mb-4" />
        Conectando con Google Sheets API...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-[Montserrat,sans-serif] text-slate-800">
      {/* HEADER MAVTEC ADMIN */}
      <header className="sticky top-0 z-30 bg-[#040a12] border-b border-white/10 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center group">
              <img src="/as.png" alt="MAVTEC" className="h-9 w-auto object-contain" />
              <div className="-ml-1 flex flex-col leading-none">
                <span className="text-white font-black text-lg tracking-tight uppercase">AVTEC</span>
                <span className="text-[#F5A623] text-[8px] font-bold tracking-[0.25em] uppercase">ADMIN PANEL</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button onClick={loadData} title="Recargar desde Excel" className="p-2 text-white/60 hover:text-[#F5A623] transition-colors">
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <button onClick={onLogout} className="flex items-center gap-1.5 px-3 py-2 text-white/60 hover:text-white rounded-lg transition-colors font-bold uppercase tracking-wider">
              Cerrar Sesión
            </button>
            <Link href="/catalogo" className="flex items-center gap-1.5 px-3 py-2 bg-[#F5A623] hover:bg-[#e09418] text-[#040a12] font-black uppercase tracking-wider rounded-lg shadow">
              <Eye size={14} /> Ver Catálogo
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-8 space-y-8">
        {/* BANNER PRINCIPAL Y BOTONES DE ACCIÓN */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Gestión de Flota y Categorías</h1>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-bold">
              <CheckCircle2 size={13} /> Sincronización BIDIRECCIONAL activa con Google Sheets
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCatForm(!showCatForm)} className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors">
              <Layers size={16} /> {showCatForm ? 'Cerrar Categoría' : '+ Nueva Categoría'}
            </button>
            <button onClick={() => setShowForm(!showForm)} className="flex items-center justify-center gap-2 px-5 py-3 bg-[#071324] hover:bg-[#10243d] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow shrink-0">
              <Plus size={16} className={showForm ? 'rotate-45' : ''} /> {showForm ? 'Cerrar' : '+ Añadir Equipo'}
            </button>
          </div>
        </div>

        {/* FORMULARIO PARA CREAR CATEGORÍA */}
        {showCatForm && (
          <form onSubmit={handleAddCategoria} className="bg-white p-6 rounded-2xl border-2 border-slate-300 shadow-md space-y-4 max-w-xl">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Layers size={16} className="text-[#F5A623]" /> Crear Nueva Categoría
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold mb-1">ID de Categoría (ej. grua-torre):</label>
                <input type="text" value={nuevaCat.id} onChange={(e) => setNuevaCat({...nuevaCat, id: e.target.value})} placeholder="ej. grua-torre" required className="w-full p-2.5 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Nombre Visible (ej. Grúa Torre):</label>
                <input type="text" value={nuevaCat.nombre} onChange={(e) => setNuevaCat({...nuevaCat, nombre: e.target.value})} placeholder="ej. Grúa Torre" required className="w-full p-2.5 border rounded-lg" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowCatForm(false)} className="px-3 py-2 border rounded-lg font-bold text-xs">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-[#F5A623] text-[#040a12] font-black text-xs uppercase rounded-lg shadow">Guardar Categoría</button>
            </div>
          </form>
        )}

        {/* MÉTRICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700"><Tractor size={24} /></div>
            <div>
              <p className="text-[11px] font-mono uppercase text-slate-400 font-bold">Total Registrados</p>
              <p className="text-2xl font-black text-slate-900 leading-tight">{machines.length} Unidades</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={24} /></div>
            <div>
              <p className="text-[11px] font-mono uppercase text-emerald-600 font-bold">Disponibles</p>
              <p className="text-2xl font-black text-emerald-700 leading-tight">{totalDisponibles} Equipos</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"><AlertTriangle size={24} /></div>
            <div>
              <p className="text-[11px] font-mono uppercase text-amber-600 font-bold">En Operación</p>
              <p className="text-2xl font-black text-amber-700 leading-tight">{totalEnObra} Equipos</p>
            </div>
          </div>
        </div>

        {/* FORMULARIO EXPANDIBLE DE MÁQUINA CON CAMPOS DINÁMICOS */}
        {showForm && (
          <form onSubmit={handleAdd} className="bg-white p-6 lg:p-8 rounded-2xl border-2 border-[#F5A623]/40 shadow-lg space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <HardHat size={20} className="text-[#F5A623]" />
              <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Registrar Nuevo Equipo en Google Sheets</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div><label className="block font-bold mb-1">ID Único:</label><input name="id" value={form.id} onChange={handleChange} placeholder="ej. exc-003" required className="w-full p-2.5 border rounded-lg" /></div>
              <div><label className="block font-bold mb-1">Nombre Comercial:</label><input name="nombre" value={form.nombre} onChange={handleChange} placeholder="ej. Excavadora MX-300" required className="w-full p-2.5 border rounded-lg" /></div>
              
              <div>
                <label className="block font-bold mb-1">Categoría:</label>
                <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full p-2.5 border rounded-lg capitalize">
                  {categoriasList.filter(c => c.id !== 'todas').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div><label className="block font-bold mb-1">Ruta de Imagen:</label><input name="imagen" value={form.imagen} onChange={handleChange} placeholder="/images/machines/excavadora.webp" className="w-full p-2.5 border rounded-lg" /></div>
              
              <div className="md:col-span-2">
                <label className="block font-bold mb-1">Descripción:</label>
                <textarea name="descripcion" rows={2} value={form.descripcion} onChange={handleChange} placeholder="Descripción detallada del equipo..." required className="w-full p-2.5 border rounded-lg" />
              </div>

              {/* LISTA DINÁMICA DE CARACTERÍSTICAS */}
              <div className="md:col-span-1 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Características Técnicas:</label>
                  <button type="button" onClick={addCaracField} className="px-2.5 py-1 bg-[#F5A623] text-[#040a12] font-black text-[10px] uppercase rounded-md shadow-sm">+ Añadir</button>
                </div>
                {caracteristicas.map((carac, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input type="text" value={carac} onChange={(e) => handleCaracChange(index, e.target.value)} placeholder="ej. Peso operativo: 20 toneladas" className="w-full p-2 bg-white border rounded-lg text-xs" />
                    {caracteristicas.length > 1 && (
                      <button type="button" onClick={() => removeCaracField(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    )}
                  </div>
                ))}
              </div>

              {/* LISTA DINÁMICA DE USOS */}
              <div className="md:col-span-1 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Usos / Aplicaciones:</label>
                  <button type="button" onClick={addUsoField} className="px-2.5 py-1 bg-[#F5A623] text-[#040a12] font-black text-[10px] uppercase rounded-md shadow-sm">+ Añadir</button>
                </div>
                {usos.map((uso, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input type="text" value={uso} onChange={(e) => handleUsoChange(index, e.target.value)} placeholder="ej. Minería subterránea" className="w-full p-2 bg-white border rounded-lg text-xs" />
                    {usos.length > 1 && (
                      <button type="button" onClick={() => removeUsoField(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    )}
                  </div>
                ))}
              </div>

              <div className="md:col-span-2 flex gap-6 pt-2">
                <label className="flex items-center gap-2 font-bold"><input type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange} /> Disponible</label>
                <label className="flex items-center gap-2 font-bold"><input type="checkbox" name="destacada" checked={form.destacada} onChange={handleChange} /> Destacada en Home</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg font-bold text-xs">Cancelar</button>
              <button type="submit" className="px-6 py-2 bg-[#F5A623] hover:bg-[#e09418] text-[#040a12] font-black uppercase text-xs rounded-lg shadow">Guardar Equipo en Excel</button>
            </div>
          </form>
        )}

        {/* TABLA PRINCIPAL DE EQUIPOS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar por nombre o ID..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs outline-none" />
            </div>
            <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="p-2 border rounded-xl text-xs capitalize">
              <option value="todas">Todas las categorías</option>
              {categoriasList.filter(c => c.id !== 'todas').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-4">Equipo / ID</th>
                  <th className="px-5 py-4">Categoría</th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMachines.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-14 rounded-lg bg-cover bg-center border shrink-0 bg-slate-100 shadow-sm" style={{ backgroundImage: `url('${m.imagen}')` }} />
                        <div>
                          <p className="font-bold text-slate-900 text-sm uppercase">{m.nombre}</p>
                          <span className="font-mono text-[10px] text-slate-400">ID: {m.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="capitalize font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md text-[11px] border border-slate-200">{m.categoria}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => handleToggleDisponible(m.id)} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] transition-transform active:scale-95 ${m.disponible ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${m.disponible ? 'bg-emerald-500' : 'bg-amber-500'}`} /> {m.disponible ? 'Disponible' : 'En obra'}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => handleDelete(m.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}