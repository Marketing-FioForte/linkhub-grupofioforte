import { useState } from "react";
import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit2, Info, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert } from "@/types/hubConfig";

export function AlertsEditor() {
  const { config, addAlert, updateAlert, deleteAlert, toggleAlertActive } = useHubConfig();
  const { alerts } = config;
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: "", message: "", active: true });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({ title: "", message: "", active: true });
  };

  const handleEdit = (alert: Alert) => {
    setEditingId(alert.id);
    setIsCreating(false);
    setFormData({ title: alert.title, message: alert.message, active: alert.active });
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.message.trim()) {
      toast({ title: "Erro", description: "Preencha título e mensagem.", variant: "destructive" });
      return;
    }

    if (isCreating) {
      addAlert(formData);
      toast({ title: "Aviso criado com sucesso!" });
    } else if (editingId) {
      updateAlert(editingId, formData);
      toast({ title: "Aviso atualizado!" });
    }

    setIsCreating(false);
    setEditingId(null);
    setFormData({ title: "", message: "", active: true });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({ title: "", message: "", active: true });
  };

  const handleDelete = (id: string) => {
    deleteAlert(id);
    toast({ title: "Aviso removido" });
  };

  const activeCount = alerts.filter((a) => a.active).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Avisos Importantes</h2>
        <p className="text-sm text-muted-foreground">
          Esses avisos aparecem no card "Avisos importantes" na página do colaborador.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {activeCount} ativo(s) de {alerts.length} aviso(s)
          </span>
        </div>
        <Button onClick={handleCreate} size="sm" className="gap-2" disabled={isCreating || editingId !== null}>
          <Plus className="w-4 h-4" />
          Novo aviso
        </Button>
      </div>

      {/* Form for creating/editing */}
      {(isCreating || editingId) && (
        <div className="bg-card rounded-2xl p-5 border-2 border-primary/50 space-y-4">
          <h3 className="font-medium text-foreground">
            {isCreating ? "Novo Aviso" : "Editar Aviso"}
          </h3>
          <div>
            <Label className="text-sm text-muted-foreground">Título</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1"
              placeholder="Ex: Novo horário"
            />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Mensagem</Label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-1"
              placeholder="Descreva o aviso..."
              rows={3}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label className="text-sm">Ativo</Label>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="gap-2">
              <Check className="w-4 h-4" />
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* List of alerts */}
      {alerts.length === 0 ? (
        <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
          <p className="text-muted-foreground">Nenhum aviso cadastrado.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-card rounded-2xl p-4 border transition-colors ${
                alert.active ? "border-border/50" : "border-border/30 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{alert.title}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        alert.active
                          ? "bg-green-500/20 text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {alert.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{alert.message}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleAlertActive(alert.id)}
                    className="h-8 w-8"
                    title={alert.active ? "Desativar" : "Ativar"}
                  >
                    <Switch checked={alert.active} className="pointer-events-none" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(alert)}
                    className="h-8 w-8"
                    disabled={isCreating || editingId !== null}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(alert.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
