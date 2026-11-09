"use client";

import React, { useState, useEffect } from "react";
import { Maquina } from "@/types";
interface DashboardCatalogoProps {
  onLogout: () => void;
}

export default function DashboardCatalogo({
  onLogout,
}: DashboardCatalogoProps) {
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/maquinas");
      const data = await res.json();
      setMaquinas(data);
    } catch (err) {
      console.error("Error al cargar inventario:", err);
    } finally {
      setLoading(false);
    }
  };

  const showHybridNotice = (actionText: string) => {
    setNotification(
      `Arquitectura Híbrida Activa: La acción '${actionText}' debe realizarse directamente en la hoja de cálculo de Google Sheets sincronizada para garantizar persistencia global.`,
    );
    setTimeout(() => setNotification(null), 8000);
  };

  const handleAdd = () => {
    showHybridNotice("Agregar nueva maquinaria");
  };

  const handleDelete = (id: string) => {
    showHybridNotice(`Eliminar máquina ${id}`);
  };

  const handleToggleDisponible = (id: string) => {
    showHybridNotice(`Cambiar disponibilidad de ${id}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Panel de Control de Catálogo
          </h2>
          <p className="text-sm text-gray-500">
            Sincronizado vía CSV / Google Sheets API
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md text-sm transition"
          >
            Cerrar sesión
          </button>

          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md text-sm transition"
          >
            + Agregar Maquinaria
          </button>
        </div>
      </div>

      {notification && (
        <div className="mb-4 p-4 border-l-4 border-amber-500 bg-amber-50 text-amber-900 text-sm rounded">
          <p className="font-semibold">Modo Sincronizado (Lectura)</p>
          <p>{notification}</p>
        </div>
      )}

      {loading ? (
        <p className="text-center py-8 text-gray-500">
          Cargando inventario actual...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b text-gray-600 text-xs uppercase tracking-wider">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Categoría</th>
                {/* <th className="p-3">Marca/Modelo</th>
                <th className="p-3">Precio</th> */}
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {maquinas.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono text-xs text-gray-500">
                    {item.id}
                  </td>
                  <td className="p-3 font-semibold text-gray-800">
                    {item.nombre}
                  </td>
                  <td className="p-3 text-gray-600">{item.categoria}</td>
                  {/* <td className="p-3 text-gray-600">{item.marca} {item.modelo}</td> */}
                  {/* <td className="p-3">${item.precio.toLocaleString()}</td> */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${item.disponible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {item.disponible ? "Disponible" : "No Disponible"}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleToggleDisponible(item.id)}
                      className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-gray-700"
                    >
                      Estado
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
