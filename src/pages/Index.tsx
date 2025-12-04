import { HubHeader } from "@/components/hub/HubHeader";
import { PortalButton } from "@/components/hub/PortalButton";
import { QuickActions } from "@/components/hub/QuickActions";
import { AlertsSection } from "@/components/hub/AlertsSection";
import { ImportantDates } from "@/components/hub/ImportantDates";
import { BirthdaySection } from "@/components/hub/BirthdaySection";
import { SipatSchedule } from "@/components/hub/SipatSchedule";
import { InstitutionalSection } from "@/components/hub/InstitutionalSection";
import { AdminAccessButton } from "@/components/hub/AdminAccessButton";
import { HubFooter } from "@/components/hub/HubFooter";
import { ScrollToTop } from "@/components/hub/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-[480px] mx-auto px-4 pb-8">
        <HubHeader />
        <PortalButton />
        <QuickActions />
        <AlertsSection />
        <ImportantDates />
        <BirthdaySection />
        <SipatSchedule />
        <InstitutionalSection />
        <AdminAccessButton />
        <HubFooter />
      </main>
      <ScrollToTop />
    </div>
  );
};

export default Index;
