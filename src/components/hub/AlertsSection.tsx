import { hubConfig } from "@/config/hubConfig";
import { useState } from "react";
import { Info } from "lucide-react";

export function AlertsSection() {
  const { alerts, alertsLastUpdated } = hubConfig;
  const [expanded, setExpanded] = useState(false);

  const visibleAlerts = expanded ? alerts : alerts.slice(0, 3);

  return (
    <section className="bg-card rounded-2xl p-5 mb-6 border border-border/50 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold text-foreground">Avisos Importantes</h2>
      </div>
      <ul className="space-y-3">
        {visibleAlerts.map((alert) => (
          <li key={alert.id} className="text-sm text-foreground/90 leading-relaxed">
            {alert.text}
          </li>
        ))}
      </ul>
      {alerts.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm text-primary hover:text-fio-blue-glow transition-colors font-medium"
        >
          {expanded ? "Ver menos avisos" : "Ver todos os avisos"}
        </button>
      )}
      <p className="mt-4 text-xs text-muted-foreground">
        Atualizado em {alertsLastUpdated}.
      </p>
    </section>
  );
}
