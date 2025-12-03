import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminSummary } from "@/components/admin/AdminSummary";
import { QuickActionsEditor } from "@/components/admin/QuickActionsEditor";
import { AlertsEditor } from "@/components/admin/AlertsEditor";
import { DatesEditor } from "@/components/admin/DatesEditor";
import { SipatEditor } from "@/components/admin/SipatEditor";
import { InstitutionalEditor } from "@/components/admin/InstitutionalEditor";
import { AdminConfigSettings } from "@/components/admin/AdminConfigSettings";
import { HistoryEditor } from "@/components/admin/HistoryEditor";
import { ScrollToTop } from "@/components/hub/ScrollToTop";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading, isAdmin } = useAuth();
  const [activeSection, setActiveSection] = useState("resumo");

  // Redirect to auth if not logged in, or home if not admin
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        navigate("/");
      }
    }
  }, [user, isLoading, isAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect
  }

  const renderContent = () => {
    switch (activeSection) {
      case "resumo":
        return <AdminSummary />;
      case "acoes":
        return <QuickActionsEditor />;
      case "avisos":
        return <AlertsEditor />;
      case "datas":
        return <DatesEditor />;
      case "sipat":
        return <SipatEditor />;
      case "institucional":
        return <InstitutionalEditor />;
      case "historico":
        return <HistoryEditor />;
      case "config":
        return <AdminConfigSettings />;
      default:
        return <AdminSummary />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 lg:ml-0 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-8 lg:px-8 pt-16 lg:pt-8">
          {renderContent()}
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
};

export default Admin;
