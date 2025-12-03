export interface GlobalConfig {
  appTitle: string;
  appSubtitle: string;
  logoUrl: string;
  portalUrl: string;
}

export interface QuickAction {
  key: string;
  label: string;
  icon: string;
  url: string;
}

export interface Alert {
  id: number;
  text: string;
}

export interface ImportantDate {
  date: string;
  event: string;
}

export interface SipatActivity {
  time: string;
  location: string;
  title: string;
}

export interface SipatDay {
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

export interface InstitutionalItem {
  key: string;
  title: string;
  description: string;
  icon: string;
  url: string;
}

export interface FooterConfig {
  text: string;
}

export interface HubConfig {
  global: GlobalConfig;
  quickActions: QuickAction[];
  alerts: Alert[];
  alertsLastUpdated: string;
  importantDates: ImportantDate[];
  sipat: SipatConfig;
  institutional: InstitutionalItem[];
  footer: FooterConfig;
}
