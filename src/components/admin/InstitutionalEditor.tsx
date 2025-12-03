import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, FileText, Building2 } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  "file-text": FileText,
};

export function InstitutionalEditor() {
  const { config, updateInstitutional } = useHubConfig();
  const { institutional } = config;

  const handleChange = (
    index: number,
    field: "title" | "description" | "url",
    value: string
  ) => {
    const updated = [...institutional];
    updated[index] = { ...updated[index], [field]: value };
    updateInstitutional(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Links Institucionais</h2>
        <p className="text-sm text-muted-foreground">
          Esses links aparecem na seção Institucional, em dois cards.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-primary" />
        <span className="text-sm text-muted-foreground">
          {institutional.length} link(s) configurado(s)
        </span>
      </div>

      <div className="space-y-4">
        {institutional.map((item, index) => {
          const Icon = iconMap[item.icon] || Shield;
          return (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-5 border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">{item.key}</span>
                  <p className="text-xs text-muted-foreground">Chave fixa</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Título</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Descrição</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">URL</Label>
                  <Input
                    value={item.url}
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
    </div>
  );
}
