import { HubConfig } from "@/types/hubConfig";

export const defaultConfig: HubConfig = {
  global: {
    appTitle: "Grupo FIOFORTE – Central do Colaborador",
    logoUrl: "/assets/logo-grupo-fioforte.svg",
    headerTitle: "Grupo FIOFORTE",
    headerSubtitle: "Central do Colaborador",
    portalUrl: "https://portal.grupofioforte.com.br",
    footerText: "© 2025 Grupo FIOFORTE – Todos os direitos reservados.",
  },
  quickActions: [
    { key: "whatsapp", label: "WhatsApp", icon: "message-circle", url: "https://api.whatsapp.com/send?phone=5527999999999" },
    { key: "phone", label: "Telefone", icon: "phone", url: "tel:+552733333333" },
    { key: "map", label: "Mapa", icon: "map-pin", url: "https://maps.google.com/?q=Grupo+FIOFORTE+Serra+ES" },
    { key: "instagram", label: "Instagram", icon: "instagram", url: "https://instagram.com/grupofioforte" },
    { key: "linkedin", label: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/company/grupofioforte" },
    { key: "site", label: "Site", icon: "globe", url: "https://grupofioforte.com.br" },
  ],
  alerts: [
    { id: "1", title: "Novo horário", message: "Atenção ao novo horário de funcionamento a partir de 01/08.", active: true },
    { id: "2", title: "Vacinação", message: "Campanha de vacinação contra a gripe em todas as unidades.", active: true },
    { id: "3", title: "Uniforme", message: "O uso do novo uniforme é obrigatório a partir de 10/09.", active: true },
    { id: "4", title: "Segurança", message: "Novos procedimentos de segurança entram em vigor na próxima semana.", active: true },
    { id: "5", title: "Sistema de ponto", message: "Atualização do sistema de ponto eletrônico programada para o fim de semana.", active: false },
  ],
  importantDates: [
    { id: "1", date: "2025-12-01", label: "SIPAT 2025 - Abertura" },
    { id: "2", date: "2025-12-05", label: "SIPAT 2025 - Encerramento" },
    { id: "3", date: "2025-12-20", label: "Confraternização de Fim de Ano" },
    { id: "4", date: "2025-12-25", label: "Natal - Feriado" },
    { id: "5", date: "2026-01-01", label: "Ano Novo - Feriado" },
    { id: "6", date: "2026-01-15", label: "Fechamento de Metas Q4" },
  ],
  sipat: {
    show: true,
    lastUpdated: "2025-11-27",
    title: "Cronograma SIPAT 2025",
    subtitle: "De 01 a 05/12 – confira as atividades por dia.",
    days: [
      {
        id: "day1",
        date: "2025-12-01",
        label: "01/12 – SEGUNDA",
        activities: [
          { id: "a1", time: "08h", location: "Auditório", title: "Abertura Oficial" },
          { id: "a2", time: "08h20 - 09h", location: "Auditório", title: "Palestra: Saúde Mental" },
          { id: "a3", time: "11h00 - 13h30", location: "Estacionamento", title: "Stands Bracol & Luvex + Quiz SIPAT" },
        ],
      },
      {
        id: "day2",
        date: "2025-12-02",
        label: "02/12 – TERÇA",
        activities: [
          { id: "b1", time: "08h", location: "Auditório", title: "Abertura SESMT & CIPA" },
          { id: "b2", time: "08h20 - 09h", location: "Auditório", title: "Palestra: Educação no Trânsito" },
          { id: "b3", time: "11h00 - 13h30", location: "Estacionamento", title: "Stands DETRAN, Tramontina e Cacau Show" },
        ],
      },
      {
        id: "day3",
        date: "2025-12-03",
        label: "03/12 – QUARTA",
        activities: [
          { id: "c1", time: "08h", location: "Auditório", title: "Abertura SESMT & CIPA" },
          { id: "c2", time: "08h20 - 09h", location: "Auditório", title: "Palestra: Segurança no Trabalho" },
          { id: "c3", time: "11h00 - 13h30", location: "Estacionamento", title: "Stands Greentec, Danny & Vicsa + Quiz SIPAT" },
        ],
      },
      {
        id: "day4",
        date: "2025-12-04",
        label: "04/12 – QUINTA",
        activities: [
          { id: "d1", time: "08h", location: "Auditório", title: "Abertura SESMT & CIPA" },
          { id: "d2", time: "08h20 - 09h", location: "Auditório", title: "Aula: Defesa Pessoal (KRAV MAGÁ)" },
          { id: "d3", time: "11h00 - 13h30", location: "Estacionamento", title: "Stands 3M e Cacau Show" },
        ],
      },
      {
        id: "day5",
        date: "2025-12-05",
        label: "05/12 – SEXTA",
        activities: [
          { id: "e1", time: "08h", location: "Auditório", title: "Encerramento Oficial" },
          { id: "e2", time: "08h20 - 09h", location: "Auditório", title: "Show de Talentos Grupo FIOFORTE" },
          { id: "e3", time: "11h00 - 13h30", location: "Estacionamento", title: "Quiz SIPAT" },
        ],
      },
    ],
  },
  institutional: [
    {
      id: "1",
      key: "canal-denuncias",
      title: "Canal de Denúncias",
      description: "Ambiente seguro e confidencial",
      icon: "shield",
      url: "https://grupofioforte.com.br/canal-de-denuncias",
    },
    {
      id: "2",
      key: "politica-privacidade",
      title: "Política de Privacidade",
      description: "Conheça nossos termos e a LGPD",
      icon: "file-text",
      url: "https://grupofioforte.com.br/politica-de-privacidade",
    },
  ],
  birthdays: [],
};
