import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminSummary } from "@/components/admin/AdminSummary";
import { QuickActionsEditor } from "@/components/admin/QuickActionsEditor";
import { AlertsEditor } from "@/components/admin/AlertsEditor";
import { DatesEditor } from "@/components/admin/DatesEditor";
import { SipatEditor } from "@/components/admin/SipatEditor";
import { InstitutionalEditor } from "@/components/admin/InstitutionalEditor";
import { AdminConfigSettings } from "@/components/admin/AdminConfigSettings";
import { ScrollToTop } from "@/components/hub/ScrollToTop";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("resumo");

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    setIsAuthenticated(authStatus === "true");
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
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
