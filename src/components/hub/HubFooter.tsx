import { hubConfig } from "@/config/hubConfig";

export function HubFooter() {
  const { footer } = hubConfig;

  return (
    <footer className="py-6 text-center">
      <p className="text-xs text-muted-foreground">{footer.text}</p>
    </footer>
  );
}
