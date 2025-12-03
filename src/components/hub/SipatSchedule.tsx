import { hubConfig } from "@/config/hubConfig";
import { Clock, CalendarDays } from "lucide-react";

export function SipatSchedule() {
  const { sipat } = hubConfig;

  if (!sipat.show) return null;

  return (
    <section className="mb-6 animate-fade-in">
      <div className="bg-card rounded-2xl p-5 border border-border/50 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">{sipat.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{sipat.subtitle}</p>
      </div>

      <div className="space-y-4">
        {sipat.days.map((day) => (
          <div
            key={day.date}
            className="bg-card rounded-2xl p-5 border border-border/50 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            <h3 className="text-sm font-bold text-foreground mb-4 ml-2">{day.label}</h3>
            <ul className="space-y-4 ml-2">
              {day.activities.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {activity.time} - {activity.location}
                    </p>
                    <p className="text-sm text-foreground font-medium">{activity.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        Atualizado em {sipat.lastUpdated}.
      </p>
    </section>
  );
}
