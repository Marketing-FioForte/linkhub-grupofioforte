import { useHubConfig } from "@/contexts/HubConfigContext";
import logoFioforte from "@/assets/logo-grupo-fioforte.png";

export function HubHeader() {
  const { config } = useHubConfig();
  const { headerTitle, headerSubtitle } = config.global;

  return (
    <header className="flex flex-col items-center pt-8 pb-6">
      <div className="w-24 h-24 mb-4 flex items-center justify-center">
        <img
          src={logoFioforte}
          alt="Grupo FIOFORTE Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="text-xl font-bold text-foreground">{headerTitle}</h1>
      <p className="text-sm text-muted-foreground">{headerSubtitle}</p>
    </header>
  );
}
