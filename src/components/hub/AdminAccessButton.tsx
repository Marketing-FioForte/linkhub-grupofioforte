import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function AdminAccessButton() {
  const { user } = useAuth();
  
  return (
    <div className="flex justify-center mb-6">
      <Link
        to={user ? "/admin" : "/auth"}
        className="inline-flex items-center justify-center gap-2 
                   px-6 py-3 min-h-[44px]
                   border border-primary rounded-lg
                   text-sm font-medium text-primary
                   hover:bg-primary/10 active:scale-[0.98]
                   transition-all duration-200"
        aria-label="Acesso ao painel administrativo de RH"
      >
        <Lock className="w-4 h-4" />
        Acesso RH
      </Link>
    </div>
  );
}
