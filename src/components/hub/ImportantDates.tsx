import { useHubConfig } from "@/contexts/HubConfigContext";
import { useState } from "react";
import { Calendar } from "lucide-react";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
}

export function ImportantDates() {
  const { config } = useHubConfig();
  const { importantDates } = config;
  const [expanded, setExpanded] = useState(false);

  const visibleDates = expanded ? importantDates : importantDates.slice(0, 4);

  if (importantDates.length === 0) return null;

  return (
    <section className="bg-card rounded-2xl p-5 mb-6 border border-border/50 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold text-foreground">Próximas Datas Importantes</h2>
      </div>
      <ul className="space-y-3">
        {visibleDates.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg min-w-[60px] text-center">
              {formatDate(item.date)}
            </span>
            <span className="text-sm text-foreground">{item.label}</span>
          </li>
        ))}
      </ul>
      {importantDates.length > 4 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm text-primary hover:text-fio-blue-glow transition-colors font-medium"
        >
          {expanded ? "Ver menos datas" : "Ver mais datas"}
        </button>
      )}
    </section>
  );
}
