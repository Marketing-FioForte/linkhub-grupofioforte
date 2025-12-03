import { useState } from "react";
import { useHubConfig } from "@/contexts/HubConfigContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Zap, 
  Bell, 
  Calendar, 
  CalendarDays, 
  Building2,
  Download,
  Copy,
  Check
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function AdminSummary() {
  const { config, exportConfig } = useHubConfig();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const stats = [
    {
      icon: Zap,
      label: "Ações Rápidas",
      value: `${config.quickActions.length}/6 configuradas`,
      color: "text-yellow-400",
    },
    {
      icon: Bell,
      label: "Avisos",
      value: `${config.alerts.filter((a) => a.active).length} ativo(s)`,
      sublabel: `${config.alerts.length} total`,
      color: "text-blue-400",
    },
    {
      icon: Calendar,
      label: "Datas Importantes",
      value: `${config.importantDates.length} cadastrada(s)`,
      color: "text-green-400",
    },
    {
      icon: CalendarDays,
      label: "SIPAT 2025",
      value: config.sipat.show ? "Bloco ativo" : "Bloco oculto",
      sublabel: `${config.sipat.days.length} dias`,
      color: config.sipat.show ? "text-emerald-400" : "text-muted-foreground",
    },
    {
      icon: Building2,
      label: "Institucional",
      value: `${config.institutional.length} links`,
      color: "text-purple-400",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(exportConfig());
    setCopied(true);
    toast({ title: "JSON copiado para a área de transferência!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportConfig()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fioforte-hub-config-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "JSON exportado!" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Resumo</h2>
        <p className="text-sm text-muted-foreground">
          Visão geral das configurações do hub do colaborador.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-semibold text-foreground">{stat.value}</p>
              {stat.sublabel && (
                <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-start gap-3">
          <LayoutDashboard className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-2">Sobre este painel</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use o menu ao lado para atualizar links rápidos, avisos, datas importantes, 
              o cronograma da SIPAT e os links institucionais. As mudanças são salvas 
              localmente e refletidas em tempo real no hub do colaborador.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <h3 className="font-medium text-foreground mb-4">Exportar Configurações</h3>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Copy className="w-4 h-4" />
                Ver JSON
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Configuração em JSON</DialogTitle>
              </DialogHeader>
              <div className="relative">
                <pre className="bg-secondary rounded-lg p-4 text-xs overflow-auto max-h-[50vh] text-foreground">
                  {exportConfig()}
                </pre>
                <Button
                  size="sm"
                  className="absolute top-2 right-2 gap-2"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copiado!" : "Copiar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="gap-2" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Baixar JSON
          </Button>
        </div>
      </div>
    </div>
  );
}
