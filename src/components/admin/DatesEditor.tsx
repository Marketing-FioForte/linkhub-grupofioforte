import { useState } from "react";
import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit2, Calendar, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImportantDate } from "@/types/hubConfig";

function formatDateDisplay(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
}

export function DatesEditor() {
  const { config, addImportantDate, updateImportantDate, deleteImportantDate } = useHubConfig();
  const { importantDates } = config;
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ date: "", label: "" });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({ date: "", label: "" });
  };

  const handleEdit = (item: ImportantDate) => {
    setEditingId(item.id);
    setIsCreating(false);
    setFormData({ date: item.date, label: item.label });
  };

  const handleSave = () => {
    if (!formData.date || !formData.label.trim()) {
      toast({ title: "Erro", description: "Preencha data e descrição.", variant: "destructive" });
      return;
    }

    if (isCreating) {
      addImportantDate(formData);
      toast({ title: "Data adicionada com sucesso!" });
    } else if (editingId) {
      updateImportantDate(editingId, formData);
      toast({ title: "Data atualizada!" });
    }

    setIsCreating(false);
    setEditingId(null);
    setFormData({ date: "", label: "" });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({ date: "", label: "" });
  };

  const handleDelete = (id: string) => {
    deleteImportantDate(id);
    toast({ title: "Data removida" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Próximas Datas Importantes</h2>
        <p className="text-sm text-muted-foreground">
          Essas datas aparecem logo abaixo dos avisos, em formato de pílulas azuis.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {importantDates.length} data(s) cadastrada(s)
          </span>
        </div>
        <Button onClick={handleCreate} size="sm" className="gap-2" disabled={isCreating || editingId !== null}>
          <Plus className="w-4 h-4" />
          Nova data
        </Button>
      </div>

      {/* Form for creating/editing */}
      {(isCreating || editingId) && (
        <div className="bg-card rounded-2xl p-5 border-2 border-primary/50 space-y-4">
          <h3 className="font-medium text-foreground">
            {isCreating ? "Nova Data" : "Editar Data"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Data</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Descrição</Label>
              <Input
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="mt-1"
                placeholder="Ex: SIPAT 2025 - Abertura"
              />
            </div>
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

      {/* List of dates */}
      {importantDates.length === 0 ? (
        <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
          <p className="text-muted-foreground">Nenhuma data cadastrada.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {importantDates.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-3"
            >
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg min-w-[60px] text-center">
                {formatDateDisplay(item.date)}
              </span>
              <span className="flex-1 text-sm text-foreground">{item.label}</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(item)}
                  className="h-8 w-8"
                  disabled={isCreating || editingId !== null}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
