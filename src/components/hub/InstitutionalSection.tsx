import { hubConfig } from "@/config/hubConfig";
import { Shield, FileText } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  "file-text": FileText,
};

export function InstitutionalSection() {
  const { institutional } = hubConfig;

  return (
    <section className="mb-6 animate-fade-in">
      <h2 className="text-base font-semibold text-foreground text-center mb-4">Institucional</h2>
      <div className="grid grid-cols-2 gap-3">
        {institutional.map((item) => {
          const Icon = iconMap[item.icon] || Shield;
          return (
            <a
              key={item.key}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card hover:bg-fio-card-hover active:scale-[0.97] transition-all duration-200 rounded-2xl p-4 flex flex-col items-center text-center tap-highlight-none border border-border/50"
            >
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground mb-1">{item.title}</span>
              <span className="text-xs text-muted-foreground leading-tight">{item.description}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
