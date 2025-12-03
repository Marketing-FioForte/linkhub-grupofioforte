import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, MapPin, Instagram, Linkedin, Globe, Zap, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { defaultConfig } from "@/config/hubConfigDefault";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "message-circle": MessageCircle,
  phone: Phone,
  "map-pin": MapPin,
  instagram: Instagram,
  linkedin: Linkedin,
  globe: Globe,
};

export function QuickActionsEditor() {
  const { config, updateQuickActions } = useHubConfig();
  const { quickActions } = config;
  const { toast } = useToast();

  const handleChange = (index: number, field: "label" | "url", value: string) => {
    const updated = [...quickActions];
    updated[index] = { ...updated[index], [field]: value };
    updateQuickActions(updated);
  };

  const handleReset = () => {
    updateQuickActions(defaultConfig.quickActions);
    toast({ title: "Ações rápidas resetadas para o padrão!" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Ações Rápidas</h2>
        <p className="text-sm text-muted-foreground">
          Esses botões aparecem logo abaixo do Portal do Colaborador, em uma grade 2×3.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {quickActions.length} ações configuradas
          </span>
        </div>
        <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Resetar
        </Button>
      </div>

      <div className="space-y-4">
        {quickActions.map((action, index) => {
          const Icon = iconMap[action.icon] || Globe;
          return (
            <div
              key={action.key}
              className="bg-card rounded-2xl p-4 border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">{action.key}</span>
                  <p className="text-xs text-muted-foreground">Ícone: {action.icon}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Label</Label>
                  <Input
                    value={action.label}
                    onChange={(e) => handleChange(index, "label", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">URL</Label>
                  <Input
                    value={action.url}
                    onChange={(e) => handleChange(index, "url", e.target.value)}
                    className="mt-1"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
