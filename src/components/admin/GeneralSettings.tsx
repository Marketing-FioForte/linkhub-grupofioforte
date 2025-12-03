import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Type } from "lucide-react";

export function GeneralSettings() {
  const { config, updateGlobal } = useHubConfig();
  const { global } = config;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Títulos</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="appTitle" className="text-sm text-muted-foreground">
              Título do App
            </Label>
            <Input
              id="appTitle"
              value={global.appTitle}
              onChange={(e) => updateGlobal({ appTitle: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="headerTitle" className="text-sm text-muted-foreground">
              Título do Header
            </Label>
            <Input
              id="headerTitle"
              value={global.headerTitle}
              onChange={(e) => updateGlobal({ headerTitle: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="headerSubtitle" className="text-sm text-muted-foreground">
              Subtítulo do Header
            </Label>
            <Input
              id="headerSubtitle"
              value={global.headerSubtitle}
              onChange={(e) => updateGlobal({ headerSubtitle: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Links</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="portalUrl" className="text-sm text-muted-foreground">
              URL do Portal do Colaborador
            </Label>
            <Input
              id="portalUrl"
              value={global.portalUrl}
              onChange={(e) => updateGlobal({ portalUrl: e.target.value })}
              className="mt-1"
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="logoUrl" className="text-sm text-muted-foreground">
              URL do Logo
            </Label>
            <Input
              id="logoUrl"
              value={global.logoUrl}
              onChange={(e) => updateGlobal({ logoUrl: e.target.value })}
              className="mt-1"
              placeholder="/assets/logo.svg"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Rodapé</h3>
        </div>
        <div>
          <Label htmlFor="footerText" className="text-sm text-muted-foreground">
            Texto do Rodapé
          </Label>
          <Input
            id="footerText"
            value={global.footerText}
            onChange={(e) => updateGlobal({ footerText: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
