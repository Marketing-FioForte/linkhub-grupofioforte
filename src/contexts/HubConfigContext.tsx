import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { HubConfig, Alert, ImportantDate, SipatDay, SipatActivity } from "@/types/hubConfig";
import { defaultConfig } from "@/config/hubConfigDefault";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

const CONFIG_KEY = "main";

interface HubConfigContextType {
  config: HubConfig;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  setConfig: (newConfig: HubConfig) => void;
  restoreConfig: (newConfig: HubConfig) => void;
  updateGlobal: (global: Partial<HubConfig["global"]>) => void;
  updateQuickActions: (quickActions: HubConfig["quickActions"]) => void;
  updateAlerts: (alerts: HubConfig["alerts"]) => void;
  addAlert: (alert: Omit<Alert, "id">) => void;
  updateAlert: (id: string, alert: Partial<Alert>) => void;
  deleteAlert: (id: string) => void;
  toggleAlertActive: (id: string) => void;
  updateImportantDates: (dates: HubConfig["importantDates"]) => void;
  addImportantDate: (date: Omit<ImportantDate, "id">) => void;
  updateImportantDate: (id: string, date: Partial<ImportantDate>) => void;
  deleteImportantDate: (id: string) => void;
  updateSipat: (sipat: Partial<HubConfig["sipat"]>) => void;
  addSipatDay: (day: Omit<SipatDay, "id">) => void;
  updateSipatDay: (id: string, day: Partial<SipatDay>) => void;
  deleteSipatDay: (id: string) => void;
  addSipatActivity: (dayId: string, activity: Omit<SipatActivity, "id">) => void;
  updateSipatActivity: (dayId: string, activityId: string, activity: Partial<SipatActivity>) => void;
  deleteSipatActivity: (dayId: string, activityId: string) => void;
  updateInstitutional: (institutional: HubConfig["institutional"]) => void;
  resetToDefault: () => void;
  exportConfig: () => string;
}

const HubConfigContext = createContext<HubConfigContextType | undefined>(undefined);

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function HubConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<HubConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load config from database
  const loadConfig = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("hub_config")
        .select("config_data")
        .eq("config_key", CONFIG_KEY)
        .maybeSingle();

      if (fetchError) {
        console.error("Error loading config:", fetchError);
        setError("Erro ao carregar configurações");
        return;
      }

      if (data?.config_data) {
        setConfigState(data.config_data as unknown as HubConfig);
      } else {
        // No config in DB yet, insert the default
        const { error: insertError } = await supabase
          .from("hub_config")
          .insert([{
            config_key: CONFIG_KEY,
            config_data: JSON.parse(JSON.stringify(defaultConfig)) as Json,
          }]);

        if (insertError) {
          console.error("Error inserting default config:", insertError);
          // Still use default config locally
        }
        setConfigState(defaultConfig);
      }
    } catch (err) {
      console.error("Unexpected error loading config:", err);
      setError("Erro inesperado ao carregar configurações");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save config to database and history
  const saveConfig = useCallback(async (newConfig: HubConfig, changeType: string = "update") => {
    try {
      setIsSaving(true);
      setError(null);

      // Get current user info
      const { data: { user } } = await supabase.auth.getUser();

      // Get the config ID first
      const { data: configData } = await supabase
        .from("hub_config")
        .select("id")
        .eq("config_key", CONFIG_KEY)
        .maybeSingle();

      const { error: upsertError } = await supabase
        .from("hub_config")
        .upsert(
          [{
            config_key: CONFIG_KEY,
            config_data: JSON.parse(JSON.stringify(newConfig)) as Json,
            updated_at: new Date().toISOString(),
          }],
          { onConflict: "config_key" }
        );

      if (upsertError) {
        console.error("Error saving config:", upsertError);
        setError("Erro ao salvar configurações");
        return;
      }

      // Save to history if user is authenticated
      if (user) {
        const { error: historyError } = await supabase
          .from("hub_config_history")
          .insert([{
            config_id: configData?.id,
            config_data: JSON.parse(JSON.stringify(newConfig)) as Json,
            changed_by: user.id,
            changed_by_email: user.email,
            change_type: changeType,
          }]);

        if (historyError) {
          console.error("Error saving history:", historyError);
          // Don't set error for history, it's secondary
        }
      }
    } catch (err) {
      console.error("Unexpected error saving config:", err);
      setError("Erro inesperado ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  // Real-time subscription for cross-device sync
  useEffect(() => {
    const channel = supabase
      .channel("hub-config-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hub_config",
          filter: `config_key=eq.${CONFIG_KEY}`,
        },
        (payload) => {
          console.log("Real-time config update received:", payload);
          if (payload.new && "config_data" in payload.new) {
            setConfigState(payload.new.config_data as unknown as HubConfig);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const setConfig = (newConfig: HubConfig) => {
    setConfigState(newConfig);
    saveConfig(newConfig);
  };

  const restoreConfig = (newConfig: HubConfig) => {
    setConfigState(newConfig);
    saveConfig(newConfig, "restore");
  };

  const updateGlobal = (global: Partial<HubConfig["global"]>) => {
    setConfigState((prev) => {
      const updated = { ...prev, global: { ...prev.global, ...global } };
      saveConfig(updated);
      return updated;
    });
  };

  const updateQuickActions = (quickActions: HubConfig["quickActions"]) => {
    setConfigState((prev) => {
      const updated = { ...prev, quickActions };
      saveConfig(updated);
      return updated;
    });
  };

  // Alerts
  const updateAlerts = (alerts: HubConfig["alerts"]) => {
    setConfigState((prev) => {
      const updated = { ...prev, alerts };
      saveConfig(updated);
      return updated;
    });
  };

  const addAlert = (alert: Omit<Alert, "id">) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        alerts: [...prev.alerts, { ...alert, id: generateId() }],
      };
      saveConfig(updated);
      return updated;
    });
  };

  const updateAlert = (id: string, alert: Partial<Alert>) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        alerts: prev.alerts.map((a) => (a.id === id ? { ...a, ...alert } : a)),
      };
      saveConfig(updated);
      return updated;
    });
  };

  const deleteAlert = (id: string) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        alerts: prev.alerts.filter((a) => a.id !== id),
      };
      saveConfig(updated);
      return updated;
    });
  };

  const toggleAlertActive = (id: string) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        alerts: prev.alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
      };
      saveConfig(updated);
      return updated;
    });
  };

  // Important Dates
  const updateImportantDates = (importantDates: HubConfig["importantDates"]) => {
    const sorted = [...importantDates].sort((a, b) => a.date.localeCompare(b.date));
    setConfigState((prev) => {
      const updated = { ...prev, importantDates: sorted };
      saveConfig(updated);
      return updated;
    });
  };

  const addImportantDate = (date: Omit<ImportantDate, "id">) => {
    setConfigState((prev) => {
      const newDates = [...prev.importantDates, { ...date, id: generateId() }];
      const updated = { ...prev, importantDates: newDates.sort((a, b) => a.date.localeCompare(b.date)) };
      saveConfig(updated);
      return updated;
    });
  };

  const updateImportantDate = (id: string, date: Partial<ImportantDate>) => {
    setConfigState((prev) => {
      const newDates = prev.importantDates.map((d) => (d.id === id ? { ...d, ...date } : d));
      const updated = { ...prev, importantDates: newDates.sort((a, b) => a.date.localeCompare(b.date)) };
      saveConfig(updated);
      return updated;
    });
  };

  const deleteImportantDate = (id: string) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        importantDates: prev.importantDates.filter((d) => d.id !== id),
      };
      saveConfig(updated);
      return updated;
    });
  };

  // SIPAT
  const updateSipat = (sipat: Partial<HubConfig["sipat"]>) => {
    setConfigState((prev) => {
      const updated = { ...prev, sipat: { ...prev.sipat, ...sipat } };
      saveConfig(updated);
      return updated;
    });
  };

  const addSipatDay = (day: Omit<SipatDay, "id">) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        sipat: {
          ...prev.sipat,
          days: [...prev.sipat.days, { ...day, id: generateId() }].sort((a, b) => a.date.localeCompare(b.date)),
        },
      };
      saveConfig(updated);
      return updated;
    });
  };

  const updateSipatDay = (id: string, day: Partial<SipatDay>) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        sipat: {
          ...prev.sipat,
          days: prev.sipat.days.map((d) => (d.id === id ? { ...d, ...day } : d)),
        },
      };
      saveConfig(updated);
      return updated;
    });
  };

  const deleteSipatDay = (id: string) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        sipat: {
          ...prev.sipat,
          days: prev.sipat.days.filter((d) => d.id !== id),
        },
      };
      saveConfig(updated);
      return updated;
    });
  };

  const addSipatActivity = (dayId: string, activity: Omit<SipatActivity, "id">) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        sipat: {
          ...prev.sipat,
          days: prev.sipat.days.map((d) =>
            d.id === dayId ? { ...d, activities: [...d.activities, { ...activity, id: generateId() }] } : d
          ),
        },
      };
      saveConfig(updated);
      return updated;
    });
  };

  const updateSipatActivity = (dayId: string, activityId: string, activity: Partial<SipatActivity>) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        sipat: {
          ...prev.sipat,
          days: prev.sipat.days.map((d) =>
            d.id === dayId
              ? { ...d, activities: d.activities.map((a) => (a.id === activityId ? { ...a, ...activity } : a)) }
              : d
          ),
        },
      };
      saveConfig(updated);
      return updated;
    });
  };

  const deleteSipatActivity = (dayId: string, activityId: string) => {
    setConfigState((prev) => {
      const updated = {
        ...prev,
        sipat: {
          ...prev.sipat,
          days: prev.sipat.days.map((d) =>
            d.id === dayId ? { ...d, activities: d.activities.filter((a) => a.id !== activityId) } : d
          ),
        },
      };
      saveConfig(updated);
      return updated;
    });
  };

  // Institutional
  const updateInstitutional = (institutional: HubConfig["institutional"]) => {
    setConfigState((prev) => {
      const updated = { ...prev, institutional };
      saveConfig(updated);
      return updated;
    });
  };

  const resetToDefault = () => {
    setConfigState(defaultConfig);
    saveConfig(defaultConfig, "reset");
  };

  const exportConfig = () => {
    return JSON.stringify(config, null, 2);
  };

  return (
    <HubConfigContext.Provider
      value={{
        config,
        isLoading,
        isSaving,
        error,
        setConfig,
        restoreConfig,
        updateGlobal,
        updateQuickActions,
        updateAlerts,
        addAlert,
        updateAlert,
        deleteAlert,
        toggleAlertActive,
        updateImportantDates,
        addImportantDate,
        updateImportantDate,
        deleteImportantDate,
        updateSipat,
        addSipatDay,
        updateSipatDay,
        deleteSipatDay,
        addSipatActivity,
        updateSipatActivity,
        deleteSipatActivity,
        updateInstitutional,
        resetToDefault,
        exportConfig,
      }}
    >
      {children}
    </HubConfigContext.Provider>
  );
}

export function useHubConfig() {
  const context = useContext(HubConfigContext);
  if (context === undefined) {
    throw new Error("useHubConfig must be used within a HubConfigProvider");
  }
  return context;
}
