import { useHubConfig } from "@/contexts/HubConfigContext";
import { Cake } from "lucide-react";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function BirthdaySection() {
  const { config } = useHubConfig();
  
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthStr = currentMonth.toString().padStart(2, "0");
  
  const birthdaysThisMonth = (config.birthdays || [])
    .filter((b) => b.date.startsWith(currentMonthStr))
    .sort((a, b) => {
      const dayA = parseInt(a.date.split("-")[1]);
      const dayB = parseInt(b.date.split("-")[1]);
      return dayA - dayB;
    });

  if (birthdaysThisMonth.length === 0) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    const [month, day] = dateStr.split("-");
    return `${day}/${month}`;
  };

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Cake className="w-5 h-5 text-primary" />
        Aniversariantes de {MONTH_NAMES[currentMonth - 1]} 🎉
      </h2>
      <div className="space-y-2">
        {birthdaysThisMonth.map((birthday) => (
          <div
            key={birthday.id}
            className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-4"
          >
            <div className="bg-primary/20 text-primary font-bold text-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
              {formatDate(birthday.date)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{birthday.name}</p>
              <p className="text-sm text-muted-foreground">{birthday.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
