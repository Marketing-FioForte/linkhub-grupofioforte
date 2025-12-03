import { hubConfig } from "@/config/hubConfig";
import { User } from "lucide-react";

export function PortalButton() {
  const { portalUrl } = hubConfig.global;

  return (
    <a
      href={portalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full mb-6 tap-highlight-none"
    >
      <div className="bg-primary hover:bg-fio-blue-glow active:scale-[0.97] transition-all duration-200 rounded-2xl p-5 flex items-center gap-4 shadow-fio-glow">
        <div className="w-12 h-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-primary-foreground">Portal do Colaborador</span>
          <span className="text-sm text-primary-foreground/80">Acesse seu holerite, férias e mais</span>
        </div>
      </div>
    </a>
  );
}
