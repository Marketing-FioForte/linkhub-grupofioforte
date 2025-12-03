import { useState } from "react";
import { useHubConfig } from "@/contexts/HubConfigContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Globe, Type, RotateCcw, AlertTriangle, Download, Copy, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function AdminConfigSettings() {
  const { config, updateGlobal, resetToDefault, exportConfig } = useHubConfig();
  const { global } = config;
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    resetToDefault();
    toast({ title: "Configurações resetadas para o padrão!" });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exportConfig());
    setCopied(true);
    toast({ title: "JSON copiado!" });
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
        <h2 className="text-lg font-semibold text-foreground mb-1">Configurações Gerais</h2>
        <p className="text-sm text-muted-foreground">
          Configure informações gerais do hub do colaborador.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Títulos e Textos</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Título do App</Label>
            <Input
              value={global.appTitle}
              onChange={(e) => updateGlobal({ appTitle: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Título do Header</Label>
              <Input
                value={global.headerTitle}
                onChange={(e) => updateGlobal({ headerTitle: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Subtítulo do Header</Label>
              <Input
                value={global.headerSubtitle}
                onChange={(e) => updateGlobal({ headerSubtitle: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Texto do Rodapé</Label>
            <Input
              value={global.footerText}
              onChange={(e) => updateGlobal({ footerText: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">URLs</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">URL do Portal do Colaborador</Label>
            <Input
              value={global.portalUrl}
              onChange={(e) => updateGlobal({ portalUrl: e.target.value })}
              className="mt-1"
              placeholder="https://..."
            />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">URL do Logo</Label>
            <Input
              value={global.logoUrl}
              onChange={(e) => updateGlobal({ logoUrl: e.target.value })}
              className="mt-1"
              placeholder="/assets/logo.svg"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Exportar / Backup</h3>
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

      <div className="bg-card rounded-2xl p-5 border border-destructive/30">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <h3 className="font-semibold text-foreground">Zona de Perigo</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Resetar todas as configurações para os valores padrão. Esta ação não pode ser desfeita.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Resetar tudo para padrão
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação irá resetar todas as configurações do hub para os valores padrão.
                Todas as alterações feitas serão perdidas. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Sim, resetar tudo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
