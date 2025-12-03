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
import { Plus, Trash2, CalendarDays, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SipatDay, SipatActivity } from "@/types/hubConfig";

export function SipatEditor() {
  const { config, updateSipat } = useHubConfig();
  const { sipat } = config;
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    updateSipat({ show: checked });
    toast({
      title: checked ? "SIPAT ativada" : "SIPAT desativada",
      description: checked
        ? "A seção SIPAT será exibida no hub."
        : "A seção SIPAT não será exibida no hub.",
    });
  };

  const handleTitleChange = (field: "title" | "subtitle", value: string) => {
    updateSipat({ [field]: value });
  };

  const handleDayChange = (dayIndex: number, field: keyof SipatDay, value: string) => {
    const updatedDays = [...sipat.days];
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], [field]: value };
    updateSipat({ days: updatedDays });
  };

  const handleActivityChange = (
    dayIndex: number,
    activityIndex: number,
    field: keyof SipatActivity,
    value: string
  ) => {
    const updatedDays = [...sipat.days];
    const updatedActivities = [...updatedDays[dayIndex].activities];
    updatedActivities[activityIndex] = {
      ...updatedActivities[activityIndex],
      [field]: value,
    };
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], activities: updatedActivities };
    updateSipat({ days: updatedDays });
  };

  const handleAddActivity = (dayIndex: number) => {
    const updatedDays = [...sipat.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      activities: [
        ...updatedDays[dayIndex].activities,
        { time: "", location: "", title: "" },
      ],
    };
    updateSipat({ days: updatedDays });
    toast({ title: "Atividade adicionada" });
  };

  const handleDeleteActivity = (dayIndex: number, activityIndex: number) => {
    const updatedDays = [...sipat.days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      activities: updatedDays[dayIndex].activities.filter((_, i) => i !== activityIndex),
    };
    updateSipat({ days: updatedDays });
    toast({ title: "Atividade removida" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Exibir SIPAT no Hub</span>
          </div>
          <Switch checked={sipat.show} onCheckedChange={handleToggle} />
        </div>
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
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {sipat.days.map((day, dayIndex) => (
          <AccordionItem
            key={day.date}
            value={day.date}
            className="bg-card rounded-2xl border border-border/50 overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">{day.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {day.activities.length} atividade(s)
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Label do Dia</Label>
                  <Input
                    value={day.label}
                    onChange={(e) => handleDayChange(dayIndex, "label", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Atividades</span>
                    <Button
                      onClick={() => handleAddActivity(dayIndex)}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </Button>
                  </div>

                  {day.activities.map((activity, actIndex) => (
                    <div
                      key={actIndex}
                      className="bg-secondary/50 rounded-xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Atividade {actIndex + 1}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteActivity(dayIndex, actIndex)}
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
                              handleActivityChange(dayIndex, actIndex, "time", e.target.value)
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
                              handleActivityChange(dayIndex, actIndex, "location", e.target.value)
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
                            handleActivityChange(dayIndex, actIndex, "title", e.target.value)
                          }
                          className="mt-1"
                          placeholder="Nome da atividade"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
