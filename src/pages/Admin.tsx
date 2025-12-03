import { AdminHeader } from "@/components/admin/AdminHeader";
import { GeneralSettings } from "@/components/admin/GeneralSettings";
import { QuickActionsEditor } from "@/components/admin/QuickActionsEditor";
import { AlertsEditor } from "@/components/admin/AlertsEditor";
import { DatesEditor } from "@/components/admin/DatesEditor";
import { SipatEditor } from "@/components/admin/SipatEditor";
import { InstitutionalEditor } from "@/components/admin/InstitutionalEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Zap, Bell, Calendar, CalendarDays, Building2 } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-[600px] mx-auto px-4 pb-8">
        <AdminHeader />

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 h-auto p-1">
            <TabsTrigger value="general" className="gap-2 py-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Geral</span>
            </TabsTrigger>
            <TabsTrigger value="actions" className="gap-2 py-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Ações</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2 py-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Avisos</span>
            </TabsTrigger>
          </TabsList>

          <TabsList className="w-full grid grid-cols-3 mb-6 h-auto p-1">
            <TabsTrigger value="dates" className="gap-2 py-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Datas</span>
            </TabsTrigger>
            <TabsTrigger value="sipat" className="gap-2 py-2">
              <CalendarDays className="w-4 h-4" />
              <span className="hidden sm:inline">SIPAT</span>
            </TabsTrigger>
            <TabsTrigger value="institutional" className="gap-2 py-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Institucional</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>

          <TabsContent value="actions">
            <QuickActionsEditor />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsEditor />
          </TabsContent>

          <TabsContent value="dates">
            <DatesEditor />
          </TabsContent>

          <TabsContent value="sipat">
            <SipatEditor />
          </TabsContent>

          <TabsContent value="institutional">
            <InstitutionalEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
