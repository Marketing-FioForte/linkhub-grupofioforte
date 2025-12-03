import { hubConfig } from "@/config/hubConfig";
import { MessageCircle, Phone, MapPin, Instagram, Linkedin, Globe } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "message-circle": MessageCircle,
  phone: Phone,
  "map-pin": MapPin,
  instagram: Instagram,
  linkedin: Linkedin,
  globe: Globe,
};

export function QuickActions() {
  const { quickActions } = hubConfig;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {quickActions.map((action) => {
        const Icon = iconMap[action.icon] || Globe;
        return (
          <a
            key={action.key}
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center bg-card hover:bg-fio-card-hover active:scale-[0.97] transition-all duration-200 rounded-2xl p-4 h-24 tap-highlight-none border border-border/50"
          >
            <Icon className="w-6 h-6 text-foreground mb-2" />
            <span className="text-xs text-muted-foreground font-medium">{action.label}</span>
          </a>
        );
      })}
    </div>
  );
}
