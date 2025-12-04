import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Zap,
  Bell,
  Calendar,
  CalendarDays,
  Building2,
  Settings,
  History,
  ArrowLeft,
  Menu,
  X,
  LogOut,
  Cake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import logoFioforte from "@/assets/logo-grupo-fioforte.png";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { key: "resumo", label: "Resumo", icon: LayoutDashboard },
  { key: "acoes", label: "Ações Rápidas", icon: Zap },
  { key: "avisos", label: "Avisos", icon: Bell },
  { key: "datas", label: "Datas Importantes", icon: Calendar },
  { key: "aniversariantes", label: "Aniversariantes", icon: Cake },
  { key: "sipat", label: "SIPAT 2025", icon: CalendarDays },
  { key: "institucional", label: "Institucional", icon: Building2 },
  { key: "historico", label: "Histórico", icon: History },
  { key: "config", label: "Configurações Gerais", icon: Settings },
];

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-card border-border"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-40 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={logoFioforte}
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="font-bold text-foreground text-sm">Painel RH</h1>
                <p className="text-xs text-muted-foreground">Hub do Colaborador</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Gerencie o conteúdo exibido no app.
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                Ambiente restrito
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <li key={item.key}>
                    <button
                      onClick={() => {
                        onSectionChange(item.key);
                        setMobileOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            {user && (
              <div className="px-3 py-2 text-xs text-muted-foreground truncate">
                {user.email}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Hub
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
