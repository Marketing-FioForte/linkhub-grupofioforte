import { useState } from "react";
import { useHubConfig } from "@/contexts/HubConfigContext";
import { Cake, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function BirthdaySection() {
  const { config } = useHubConfig();
  const [isOpen, setIsOpen] = useState(false);
  
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
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="bg-card rounded-xl p-4 border border-border/50 flex items-center justify-between cursor-pointer hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-2">
              <Cake className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">
                Aniversariantes de {MONTH_NAMES[currentMonth - 1]} 🎉
              </span>
              <span className="text-sm text-muted-foreground">
                ({birthdaysThisMonth.length})
              </span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2 data-[state=open]:animate-fade-in">
          {birthdaysThisMonth.map((birthday, index) => (
            <div
              key={birthday.id}
              className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
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
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}
