import { useHubConfig } from "@/contexts/HubConfigContext";

export function HubFooter() {
  const { config } = useHubConfig();
  const { footer } = config;

  return (
    <footer className="py-6 text-center">
      <p className="text-xs text-muted-foreground">{footer.text}</p>
    </footer>
  );
}
