import { useState } from "react";
import { useHubConfig } from "@/contexts/HubConfigContext";
import { Birthday } from "@/types/hubConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Cake, X, Check } from "lucide-react";
import { toast } from "sonner";

const COMPANIES = ["I9 Engenharia", "FIOFORTE", "Grupo FIOFORTE"];

const MONTHS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

export function BirthdaysEditor() {
  const { config, addBirthday, updateBirthday, deleteBirthday } = useHubConfig();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", month: "", day: "", company: "" });

  const birthdays = config.birthdays || [];

  const resetForm = () => {
    setFormData({ name: "", month: "", day: "", company: "" });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleAdd = () => {
    if (!formData.name || !formData.month || !formData.day || !formData.company) {
      toast.error("Preencha todos os campos");
      return;
    }
    const dayNum = parseInt(formData.day);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      toast.error("Dia inválido");
      return;
    }
    const date = `${formData.month}-${formData.day.padStart(2, "0")}`;
    addBirthday({ name: formData.name.toUpperCase(), date, company: formData.company });
    toast.success("Aniversariante adicionado!");
    resetForm();
  };

  const handleEdit = (birthday: Birthday) => {
    const [month, day] = birthday.date.split("-");
    setFormData({ name: birthday.name, month, day, company: birthday.company });
    setEditingId(birthday.id);
    setIsAdding(false);
  };

  const handleUpdate = () => {
    if (!editingId || !formData.name || !formData.month || !formData.day || !formData.company) {
      toast.error("Preencha todos os campos");
      return;
    }
    const dayNum = parseInt(formData.day);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      toast.error("Dia inválido");
      return;
    }
    const date = `${formData.month}-${formData.day.padStart(2, "0")}`;
    updateBirthday(editingId, { name: formData.name.toUpperCase(), date, company: formData.company });
    toast.success("Aniversariante atualizado!");
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteBirthday(id);
    toast.success("Aniversariante removido!");
  };

  const formatDate = (dateStr: string) => {
    const [month, day] = dateStr.split("-");
    return `${day}/${month}`;
  };

  const getMonthName = (monthNum: string) => {
    return MONTHS.find((m) => m.value === monthNum)?.label || monthNum;
  };

  // Group birthdays by month
  const birthdaysByMonth = birthdays.reduce((acc, b) => {
    const month = b.date.split("-")[0];
    if (!acc[month]) acc[month] = [];
    acc[month].push(b);
    return acc;
  }, {} as Record<string, Birthday[]>);

  // Sort months and birthdays within each month
  const sortedMonths = Object.keys(birthdaysByMonth).sort();
  sortedMonths.forEach((month) => {
    birthdaysByMonth[month].sort((a, b) => {
      const dayA = parseInt(a.date.split("-")[1]);
      const dayB = parseInt(b.date.split("-")[1]);
      return dayA - dayB;
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Cake className="w-6 h-6 text-primary" />
            Aniversariantes
          </h1>
          <p className="text-muted-foreground">
            {birthdays.length} aniversariante{birthdays.length !== 1 ? "s" : ""} cadastrado{birthdays.length !== 1 ? "s" : ""}
          </p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Card className="border-primary/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {isAdding ? "Novo Aniversariante" : "Editar Aniversariante"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mês</Label>
                <Select value={formData.month} onValueChange={(v) => setFormData({ ...formData, month: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Dia</Label>
                <Input
                  type="number"
                  min={1}
                  max={31}
                  placeholder="Dia"
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Select value={formData.company} onValueChange={(v) => setFormData({ ...formData, company: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={isAdding ? handleAdd : handleUpdate} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                {isAdding ? "Adicionar" : "Salvar"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Birthdays List by Month */}
      {sortedMonths.length > 0 ? (
        <div className="space-y-6">
          {sortedMonths.map((month) => (
            <div key={month}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {getMonthName(month)}
              </h3>
              <div className="space-y-2">
                {birthdaysByMonth[month].map((birthday) => (
                  <Card key={birthday.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 text-primary font-bold text-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                        {formatDate(birthday.date)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{birthday.name}</p>
                        <p className="text-sm text-muted-foreground">{birthday.company}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(birthday)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(birthday.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center text-muted-foreground">
          <Cake className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum aniversariante cadastrado.</p>
          <p className="text-sm">Clique em "Adicionar" para começar.</p>
        </Card>
      )}
    </div>
  );
}
