import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { HubConfig } from "@/types/hubConfig";
import { hubConfig as defaultConfig } from "@/config/hubConfig";

const STORAGE_KEY = "hubConfig";

interface HubConfigContextType {
  config: HubConfig;
  updateConfig: (newConfig: Partial<HubConfig>) => void;
  updateGlobal: (global: Partial<HubConfig["global"]>) => void;
  updateQuickActions: (quickActions: HubConfig["quickActions"]) => void;
  updateAlerts: (alerts: HubConfig["alerts"], lastUpdated?: string) => void;
  updateImportantDates: (dates: HubConfig["importantDates"]) => void;
  updateSipat: (sipat: Partial<HubConfig["sipat"]>) => void;
  updateInstitutional: (institutional: HubConfig["institutional"]) => void;
  updateFooter: (footer: Partial<HubConfig["footer"]>) => void;
  resetToDefault: () => void;
}

const HubConfigContext = createContext<HubConfigContextType | undefined>(undefined);

function loadConfigFromStorage(): HubConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as HubConfig;
    }
  } catch (error) {
    console.error("Error loading config from localStorage:", error);
  }
  return defaultConfig as HubConfig;
}

function saveConfigToStorage(config: HubConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Error saving config to localStorage:", error);
  }
}

export function HubConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<HubConfig>(loadConfigFromStorage);

  useEffect(() => {
    saveConfigToStorage(config);
  }, [config]);

  const updateConfig = (newConfig: Partial<HubConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const updateGlobal = (global: Partial<HubConfig["global"]>) => {
    setConfig((prev) => ({ ...prev, global: { ...prev.global, ...global } }));
  };

  const updateQuickActions = (quickActions: HubConfig["quickActions"]) => {
    setConfig((prev) => ({ ...prev, quickActions }));
  };

  const updateAlerts = (alerts: HubConfig["alerts"], lastUpdated?: string) => {
    setConfig((prev) => ({
      ...prev,
      alerts,
      alertsLastUpdated: lastUpdated || new Date().toLocaleDateString("pt-BR"),
    }));
  };

  const updateImportantDates = (importantDates: HubConfig["importantDates"]) => {
    setConfig((prev) => ({ ...prev, importantDates }));
  };

  const updateSipat = (sipat: Partial<HubConfig["sipat"]>) => {
    setConfig((prev) => ({ ...prev, sipat: { ...prev.sipat, ...sipat } }));
  };

  const updateInstitutional = (institutional: HubConfig["institutional"]) => {
    setConfig((prev) => ({ ...prev, institutional }));
  };

  const updateFooter = (footer: Partial<HubConfig["footer"]>) => {
    setConfig((prev) => ({ ...prev, footer: { ...prev.footer, ...footer } }));
  };

  const resetToDefault = () => {
    setConfig(defaultConfig as HubConfig);
  };

  return (
    <HubConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateGlobal,
        updateQuickActions,
        updateAlerts,
        updateImportantDates,
        updateSipat,
        updateInstitutional,
        updateFooter,
        resetToDefault,
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
