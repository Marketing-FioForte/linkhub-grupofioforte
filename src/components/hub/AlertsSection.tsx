import { useHubConfig } from "@/contexts/HubConfigContext";
import { useState } from "react";
import { Info } from "lucide-react";

export function AlertsSection() {
  const { config } = useHubConfig();
  const activeAlerts = config.alerts.filter((a) => a.active);
  const [expanded, setExpanded] = useState(false);

  const visibleAlerts = expanded ? activeAlerts : activeAlerts.slice(0, 3);

  if (activeAlerts.length === 0) return null;

  return (
    <section className="bg-card rounded-2xl p-5 mb-6 border border-border/50 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold text-foreground">Avisos Importantes</h2>
      </div>
      <ul className="space-y-3">
        {visibleAlerts.map((alert) => (
          <li key={alert.id} className="text-sm text-foreground/90 leading-relaxed">
            <span className="font-medium">{alert.title}:</span> {alert.message}
          </li>
        ))}
      </ul>
      {activeAlerts.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm text-primary hover:text-fio-blue-glow transition-colors font-medium"
        >
          {expanded ? "Ver menos avisos" : "Ver todos os avisos"}
        </button>
      )}
    </section>
  );
}
