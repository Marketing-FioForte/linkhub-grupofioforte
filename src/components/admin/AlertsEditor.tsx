import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AlertsEditor() {
  const { config, updateAlerts } = useHubConfig();
  const { alerts } = config;
  const { toast } = useToast();

  const handleChange = (index: number, value: string) => {
    const updated = [...alerts];
    updated[index] = { ...updated[index], text: value };
    updateAlerts(updated);
  };

  const handleAdd = () => {
    const newId = Math.max(...alerts.map((a) => a.id), 0) + 1;
    updateAlerts([...alerts, { id: newId, text: "" }]);
    toast({ title: "Aviso adicionado", description: "Preencha o texto do novo aviso." });
  };

  const handleDelete = (index: number) => {
    const updated = alerts.filter((_, i) => i !== index);
    updateAlerts(updated);
    toast({ title: "Aviso removido" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {alerts.length} aviso(s) cadastrado(s)
          </span>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
          <p className="text-muted-foreground">Nenhum aviso cadastrado.</p>
        </div>
      ) : (
        alerts.map((alert, index) => (
          <div
            key={alert.id}
            className="bg-card rounded-2xl p-4 border border-border/50 flex gap-3"
          >
            <div className="flex-1">
              <Input
                value={alert.text}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Digite o texto do aviso..."
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
