import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Type } from "lucide-react";

export function GeneralSettings() {
  const { config, updateGlobal, updateFooter } = useHubConfig();
  const { global, footer } = config;

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
              Título Principal
            </Label>
            <Input
              id="appTitle"
              value={global.appTitle}
              onChange={(e) => updateGlobal({ appTitle: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="appSubtitle" className="text-sm text-muted-foreground">
              Subtítulo
            </Label>
            <Input
              id="appSubtitle"
              value={global.appSubtitle}
              onChange={(e) => updateGlobal({ appSubtitle: e.target.value })}
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
            value={footer.text}
            onChange={(e) => updateFooter({ text: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
