import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Phone, MapPin, Instagram, Linkedin, Globe } from "lucide-react";

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

  const handleChange = (index: number, field: "label" | "url", value: string) => {
    const updated = [...quickActions];
    updated[index] = { ...updated[index], [field]: value };
    updateQuickActions(updated);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Edite os 6 botões de ação rápida exibidos no hub.
      </p>
      {quickActions.map((action, index) => {
        const Icon = iconMap[action.icon] || Globe;
        return (
          <div
            key={action.key}
            className="bg-card rounded-2xl p-4 border border-border/50"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-medium text-foreground">{action.key}</span>
            </div>
            <div className="space-y-3">
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
  );
}
