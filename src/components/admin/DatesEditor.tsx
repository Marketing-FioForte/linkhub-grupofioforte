import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DatesEditor() {
  const { config, updateImportantDates } = useHubConfig();
  const { importantDates } = config;
  const { toast } = useToast();

  const handleChange = (index: number, field: "date" | "event", value: string) => {
    const updated = [...importantDates];
    updated[index] = { ...updated[index], [field]: value };
    updateImportantDates(updated);
  };

  const handleAdd = () => {
    updateImportantDates([...importantDates, { date: "", event: "" }]);
    toast({ title: "Data adicionada", description: "Preencha a data e o evento." });
  };

  const handleDelete = (index: number) => {
    const updated = importantDates.filter((_, i) => i !== index);
    updateImportantDates(updated);
    toast({ title: "Data removida" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {importantDates.length} data(s) cadastrada(s)
          </span>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </div>

      {importantDates.length === 0 ? (
        <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
          <p className="text-muted-foreground">Nenhuma data cadastrada.</p>
        </div>
      ) : (
        importantDates.map((item, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-4 border border-border/50 flex gap-3 items-start"
          >
            <div className="w-24 flex-shrink-0">
              <Input
                value={item.date}
                onChange={(e) => handleChange(index, "date", e.target.value)}
                placeholder="DD/MM"
                className="text-center"
              />
            </div>
            <div className="flex-1">
              <Input
                value={item.event}
                onChange={(e) => handleChange(index, "event", e.target.value)}
                placeholder="Descrição do evento..."
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(index)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
