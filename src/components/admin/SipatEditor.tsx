import { useState } from "react";
import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2, CalendarDays, Clock, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SipatDay, SipatActivity } from "@/types/hubConfig";

export function SipatEditor() {
  const { config, updateSipat, addSipatDay, updateSipatDay, deleteSipatDay, addSipatActivity, updateSipatActivity, deleteSipatActivity } = useHubConfig();
  const { sipat } = config;
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    updateSipat({ show: checked });
    toast({
      title: checked ? "SIPAT ativada" : "SIPAT desativada",
      description: checked ? "A seção será exibida no hub." : "A seção não será exibida.",
    });
  };

  const handleTitleChange = (field: "title" | "subtitle" | "lastUpdated", value: string) => {
    updateSipat({ [field]: value });
  };

  const handleAddDay = () => {
    const newDay: Omit<SipatDay, "id"> = {
      date: new Date().toISOString().split("T")[0],
      label: "Novo dia",
      activities: [],
    };
    addSipatDay(newDay);
    toast({ title: "Dia adicionado" });
  };

  const handleDayChange = (dayId: string, field: keyof SipatDay, value: string) => {
    updateSipatDay(dayId, { [field]: value });
  };

  const handleDeleteDay = (dayId: string) => {
    deleteSipatDay(dayId);
    toast({ title: "Dia removido" });
  };

  const handleAddActivity = (dayId: string) => {
    const newActivity: Omit<SipatActivity, "id"> = {
      time: "",
      location: "",
      title: "",
    };
    addSipatActivity(dayId, newActivity);
    toast({ title: "Atividade adicionada" });
  };

  const handleActivityChange = (
    dayId: string,
    activityId: string,
    field: keyof SipatActivity,
    value: string
  ) => {
    updateSipatActivity(dayId, activityId, { [field]: value });
  };

  const handleDeleteActivity = (dayId: string, activityId: string) => {
    deleteSipatActivity(dayId, activityId);
    toast({ title: "Atividade removida" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">SIPAT 2025 – Cronograma</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie o cronograma da SIPAT exibido no hub do colaborador.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Exibir bloco SIPAT no hub</span>
          </div>
          <Switch checked={sipat.show} onCheckedChange={handleToggle} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {sipat.show ? "O cronograma está visível para os colaboradores." : "O cronograma está oculto."}
        </p>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50 space-y-4">
        <div>
          <Label className="text-sm text-muted-foreground">Título da Seção</Label>
          <Input
            value={sipat.title}
            onChange={(e) => handleTitleChange("title", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Subtítulo</Label>
          <Input
            value={sipat.subtitle}
            onChange={(e) => handleTitleChange("subtitle", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Última Atualização</Label>
          <Input
            type="date"
            value={sipat.lastUpdated}
            onChange={(e) => handleTitleChange("lastUpdated", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Dias da SIPAT ({sipat.days.length})</span>
        <Button onClick={handleAddDay} size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar dia
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {sipat.days.map((day) => (
          <AccordionItem
            key={day.id}
            value={day.id}
            className="bg-card rounded-2xl border border-border/50 overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <div className="text-left flex-1">
                  <p className="font-semibold text-foreground">{day.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {day.activities.length} atividade(s)
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Data</Label>
                    <Input
                      type="date"
                      value={day.date}
                      onChange={(e) => handleDayChange(day.id, "date", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Label do Dia</Label>
                    <Input
                      value={day.label}
                      onChange={(e) => handleDayChange(day.id, "label", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-foreground">Atividades</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddActivity(day.id)}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Atividade
                    </Button>
                    <Button
                      onClick={() => handleDeleteDay(day.id)}
                      size="sm"
                      variant="outline"
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir dia
                    </Button>
                  </div>
                </div>

                {day.activities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhuma atividade cadastrada.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {day.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="bg-secondary/50 rounded-xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Atividade</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteActivity(day.id, activity.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Horário</Label>
                            <Input
                              value={activity.time}
                              onChange={(e) =>
                                handleActivityChange(day.id, activity.id, "time", e.target.value)
                              }
                              className="mt-1"
                              placeholder="08h - 09h"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Local</Label>
                            <Input
                              value={activity.location}
                              onChange={(e) =>
                                handleActivityChange(day.id, activity.id, "location", e.target.value)
                              }
                              className="mt-1"
                              placeholder="Auditório"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Título</Label>
                          <Input
                            value={activity.title}
                            onChange={(e) =>
                              handleActivityChange(day.id, activity.id, "title", e.target.value)
                            }
                            className="mt-1"
                            placeholder="Nome da atividade"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
