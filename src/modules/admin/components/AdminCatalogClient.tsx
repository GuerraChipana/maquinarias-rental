"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, KeyRound, ArrowRight, ArrowLeft } from "lucide-react";
import DashboardCatalogo from "@/components/admin/DashboardCatalogo";
import {
  verificarPasswordAdmin,
  cerrarSesionAdmin,
} from "@/app/actions/auth";

interface AdminCatalogClientProps {
  initialAuthenticated: boolean;
}

export default function AdminCatalogClient({
  initialAuthenticated,
}: AdminCatalogClientProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isValid = await verificarPasswordAdmin(password);

      if (isValid) {
        setIsAuthenticated(true);
        setErrorAuth(false);
        setPassword("");
        router.refresh();
      } else {
        setErrorAuth(true);
        setPassword("");
      }
    } catch {
      setErrorAuth(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await cerrarSesionAdmin();
    setIsAuthenticated(false);
    router.refresh();
  };

  if (isAuthenticated) {
    return <DashboardCatalogo onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-[#040a12] flex flex-col items-center justify-center p-5 font-[Montserrat,sans-serif] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
      >
        <ArrowLeft size={16} /> Volver a la web
      </Link>

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-[#071324] border border-white/10 p-8 rounded-2xl shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-[#F5A623] rounded-2xl flex items-center justify-center text-[#040a12] shadow-[0_0_30px_rgba(245,166,35,0.3)]">
            <Lock size={32} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Acceso Restringido
          </h1>
          <p className="text-xs text-white/50 mt-2 font-mono">
            PANEL ADMINISTRATIVO MAVTEC
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <KeyRound
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="password"
              placeholder="Código de autorización"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full bg-[#040a12] border ${
                errorAuth
                  ? "border-red-500"
                  : "border-white/10 focus:border-[#F5A623]"
              } rounded-xl py-3 pl-12 pr-4 text-white text-sm outline-none transition-colors font-mono placeholder:font-sans`}
            />
          </div>

          {errorAuth && (
            <p className="text-red-500 text-xs text-center font-bold animate-pulse">
              Acceso denegado. Código incorrecto.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e09418] text-[#040a12] font-black uppercase tracking-wider py-4 rounded-xl transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isLoading ? "Verificando..." : "Desbloquear Panel"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
