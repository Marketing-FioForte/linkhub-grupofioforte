import { hubConfig } from "@/config/hubConfig";
import { useState } from "react";
import { Calendar } from "lucide-react";

export function ImportantDates() {
  const { importantDates } = hubConfig;
  const [expanded, setExpanded] = useState(false);

  const visibleDates = expanded ? importantDates : importantDates.slice(0, 4);

  return (
    <section className="bg-card rounded-2xl p-5 mb-6 border border-border/50 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-base font-semibold text-foreground">Próximas Datas Importantes</h2>
      </div>
      <ul className="space-y-3">
        {visibleDates.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg min-w-[60px] text-center">
              {item.date}
            </span>
            <span className="text-sm text-foreground">{item.event}</span>
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
