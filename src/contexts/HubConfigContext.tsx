import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { HubConfig, Alert, ImportantDate, SipatDay, SipatActivity } from "@/types/hubConfig";
import { defaultConfig } from "@/config/hubConfigDefault";

const STORAGE_KEY = "fioforte-hub-config";

interface HubConfigContextType {
  config: HubConfig;
  setConfig: (newConfig: HubConfig) => void;
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

function loadConfigFromStorage(): HubConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as HubConfig;
    }
  } catch (error) {
    console.error("Error loading config from localStorage:", error);
  }
  return defaultConfig;
}

function saveConfigToStorage(config: HubConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Error saving config to localStorage:", error);
  }
}

export function HubConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<HubConfig>(loadConfigFromStorage);

  useEffect(() => {
    saveConfigToStorage(config);
  }, [config]);

  // Listen to storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setConfigState(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setConfig = (newConfig: HubConfig) => {
    setConfigState(newConfig);
  };

  const updateGlobal = (global: Partial<HubConfig["global"]>) => {
    setConfigState((prev) => ({ ...prev, global: { ...prev.global, ...global } }));
  };

  const updateQuickActions = (quickActions: HubConfig["quickActions"]) => {
    setConfigState((prev) => ({ ...prev, quickActions }));
  };

  // Alerts
  const updateAlerts = (alerts: HubConfig["alerts"]) => {
    setConfigState((prev) => ({ ...prev, alerts }));
  };

  const addAlert = (alert: Omit<Alert, "id">) => {
    setConfigState((prev) => ({
      ...prev,
      alerts: [...prev.alerts, { ...alert, id: generateId() }],
    }));
  };

  const updateAlert = (id: string, alert: Partial<Alert>) => {
    setConfigState((prev) => ({
      ...prev,
      alerts: prev.alerts.map((a) => (a.id === id ? { ...a, ...alert } : a)),
    }));
  };

  const deleteAlert = (id: string) => {
    setConfigState((prev) => ({
      ...prev,
      alerts: prev.alerts.filter((a) => a.id !== id),
    }));
  };

  const toggleAlertActive = (id: string) => {
    setConfigState((prev) => ({
      ...prev,
      alerts: prev.alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    }));
  };

  // Important Dates
  const updateImportantDates = (importantDates: HubConfig["importantDates"]) => {
    const sorted = [...importantDates].sort((a, b) => a.date.localeCompare(b.date));
    setConfigState((prev) => ({ ...prev, importantDates: sorted }));
  };

  const addImportantDate = (date: Omit<ImportantDate, "id">) => {
    setConfigState((prev) => {
      const newDates = [...prev.importantDates, { ...date, id: generateId() }];
      return { ...prev, importantDates: newDates.sort((a, b) => a.date.localeCompare(b.date)) };
    });
  };

  const updateImportantDate = (id: string, date: Partial<ImportantDate>) => {
    setConfigState((prev) => {
      const updated = prev.importantDates.map((d) => (d.id === id ? { ...d, ...date } : d));
      return { ...prev, importantDates: updated.sort((a, b) => a.date.localeCompare(b.date)) };
    });
  };

  const deleteImportantDate = (id: string) => {
    setConfigState((prev) => ({
      ...prev,
      importantDates: prev.importantDates.filter((d) => d.id !== id),
    }));
  };

  // SIPAT
  const updateSipat = (sipat: Partial<HubConfig["sipat"]>) => {
    setConfigState((prev) => ({ ...prev, sipat: { ...prev.sipat, ...sipat } }));
  };

  const addSipatDay = (day: Omit<SipatDay, "id">) => {
    setConfigState((prev) => ({
      ...prev,
      sipat: {
        ...prev.sipat,
        days: [...prev.sipat.days, { ...day, id: generateId() }].sort((a, b) => a.date.localeCompare(b.date)),
      },
    }));
  };

  const updateSipatDay = (id: string, day: Partial<SipatDay>) => {
    setConfigState((prev) => ({
      ...prev,
      sipat: {
        ...prev.sipat,
        days: prev.sipat.days.map((d) => (d.id === id ? { ...d, ...day } : d)),
      },
    }));
  };

  const deleteSipatDay = (id: string) => {
    setConfigState((prev) => ({
      ...prev,
      sipat: {
        ...prev.sipat,
        days: prev.sipat.days.filter((d) => d.id !== id),
      },
    }));
  };

  const addSipatActivity = (dayId: string, activity: Omit<SipatActivity, "id">) => {
    setConfigState((prev) => ({
      ...prev,
      sipat: {
        ...prev.sipat,
        days: prev.sipat.days.map((d) =>
          d.id === dayId ? { ...d, activities: [...d.activities, { ...activity, id: generateId() }] } : d
        ),
      },
    }));
  };

  const updateSipatActivity = (dayId: string, activityId: string, activity: Partial<SipatActivity>) => {
    setConfigState((prev) => ({
      ...prev,
      sipat: {
        ...prev.sipat,
        days: prev.sipat.days.map((d) =>
          d.id === dayId
            ? { ...d, activities: d.activities.map((a) => (a.id === activityId ? { ...a, ...activity } : a)) }
            : d
        ),
      },
    }));
  };

  const deleteSipatActivity = (dayId: string, activityId: string) => {
    setConfigState((prev) => ({
      ...prev,
      sipat: {
        ...prev.sipat,
        days: prev.sipat.days.map((d) =>
          d.id === dayId ? { ...d, activities: d.activities.filter((a) => a.id !== activityId) } : d
        ),
      },
    }));
  };

  // Institutional
  const updateInstitutional = (institutional: HubConfig["institutional"]) => {
    setConfigState((prev) => ({ ...prev, institutional }));
  };

  const resetToDefault = () => {
    setConfigState(defaultConfig);
  };

  const exportConfig = () => {
    return JSON.stringify(config, null, 2);
  };

  return (
    <HubConfigContext.Provider
      value={{
        config,
        setConfig,
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
