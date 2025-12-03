import { useHubConfig } from "@/contexts/HubConfigContext";

export function HubFooter() {
  const { config } = useHubConfig();

  return (
    <footer className="py-6 text-center">
      <p className="text-xs text-muted-foreground">{config.global.footerText}</p>
    </footer>
  );
}
