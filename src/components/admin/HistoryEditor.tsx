import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useHubConfig } from "@/contexts/HubConfigContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { History, RotateCcw, Eye, Clock, User } from "lucide-react";
import { HubConfig } from "@/types/hubConfig";

interface HistoryEntry {
  id: string;
  config_data: HubConfig;
  changed_by_email: string | null;
  change_type: string;
  created_at: string;
}

export function HistoryEditor() {
  const { restoreConfig } = useHubConfig();
  const { toast } = useToast();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    loadHistory();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel("history-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "hub_config_history",
        },
        () => {
          loadHistory();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("hub_config_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error loading history:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o histórico.",
          variant: "destructive",
        });
        return;
      }

      setHistory((data || []).map(entry => ({
        ...entry,
        config_data: entry.config_data as unknown as HubConfig
      })));
    } catch (err) {
      console.error("Unexpected error loading history:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (entry: HistoryEntry) => {
    setIsRestoring(true);
    try {
      restoreConfig(entry.config_data);
      toast({
        title: "Configuração restaurada",
        description: "A configuração foi restaurada com sucesso.",
      });
      setSelectedEntry(null);
    } catch (err) {
      console.error("Error restoring config:", err);
      toast({
        title: "Erro",
        description: "Não foi possível restaurar a configuração.",
        variant: "destructive",
      });
    } finally {
      setIsRestoring(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getChangeTypeLabel = (type: string) => {
    switch (type) {
      case "update":
        return "Atualização";
      case "reset":
        return "Reset";
      case "restore":
        return "Restauração";
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Histórico de Alterações</h2>
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Histórico de Alterações</h2>
        <p className="text-sm text-muted-foreground">
          Visualize e restaure versões anteriores das configurações do hub.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-primary" />
        <span className="text-sm text-muted-foreground">
          {history.length} alteração(ões) registrada(s)
        </span>
      </div>

      {history.length === 0 ? (
        <Card className="bg-card/50">
          <CardContent className="pt-6 text-center">
            <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhuma alteração registrada ainda.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              As alterações feitas nas configurações serão listadas aqui.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <Card key={entry.id} className="bg-card border-border/50">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {getChangeTypeLabel(entry.change_type)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(entry.created_at)}
                      </div>
                      {entry.changed_by_email && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {entry.changed_by_email}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedEntry(entry)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Visualizar Configuração</DialogTitle>
                          <DialogDescription>
                            {formatDate(entry.created_at)} - {getChangeTypeLabel(entry.change_type)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-xs text-foreground whitespace-pre-wrap">
                            {JSON.stringify(entry.config_data, null, 2)}
                          </pre>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => handleRestore(entry)}
                            disabled={isRestoring}
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            {isRestoring ? "Restaurando..." : "Restaurar esta versão"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleRestore(entry)}
                      disabled={isRestoring}
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Restaurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
