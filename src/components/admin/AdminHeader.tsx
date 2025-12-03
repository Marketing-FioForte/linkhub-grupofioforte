import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import logoFioforte from "@/assets/logo-grupo-fioforte.png";

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between py-6 border-b border-border mb-6">
      <div className="flex items-center gap-3">
        <img
          src={logoFioforte}
          alt="Grupo FIOFORTE Logo"
          className="w-10 h-10 object-contain"
        />
        <div>
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Painel RH
          </h1>
          <p className="text-xs text-muted-foreground">Editar Hub do Colaborador</p>
        </div>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>
    </header>
  );
}
