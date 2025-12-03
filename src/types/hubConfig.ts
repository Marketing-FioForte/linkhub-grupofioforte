export interface QuickAction {
  key: string;
  label: string;
  icon: string;
  url: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  active: boolean;
}

export interface ImportantDate {
  id: string;
  date: string;
  label: string;
}

export interface SipatActivity {
  id: string;
  time: string;
  location: string;
  title: string;
  description?: string;
}

export interface SipatDay {
  id: string;
  date: string;
  label: string;
  activities: SipatActivity[];
}

export interface SipatConfig {
  show: boolean;
  lastUpdated: string;
  title: string;
  subtitle: string;
  days: SipatDay[];
}

export interface InstitutionalLink {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  url: string;
}

export interface GlobalConfig {
  appTitle: string;
  logoUrl: string;
  headerTitle: string;
  headerSubtitle: string;
  portalUrl: string;
  footerText: string;
}

export interface HubConfig {
  global: GlobalConfig;
  quickActions: QuickAction[];
  alerts: Alert[];
  importantDates: ImportantDate[];
  sipat: SipatConfig;
  institutional: InstitutionalLink[];
}
