export const hubConfig = {
  global: {
    appTitle: "Grupo FIOFORTE",
    appSubtitle: "Central do Colaborador",
    logoUrl: "/assets/logo-grupo-fioforte.svg",
    portalUrl: "https://portal.grupofioforte.com.br",
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
    { id: 1, text: "Atenção ao novo horário de funcionamento a partir de 01/08." },
    { id: 2, text: "Campanha de vacinação contra a gripe em todas as unidades." },
    { id: 3, text: "O uso do novo uniforme é obrigatório a partir de 10/09." },
    { id: 4, text: "Novos procedimentos de segurança entram em vigor na próxima semana." },
    { id: 5, text: "Atualização do sistema de ponto eletrônico programada para o fim de semana." },
  ],
  alertsLastUpdated: "27/11/2025",
  importantDates: [
    { date: "01/12", event: "SIPAT 2025 - Abertura" },
    { date: "05/12", event: "SIPAT 2025 - Encerramento" },
    { date: "20/12", event: "Confraternização de Fim de Ano" },
    { date: "25/12", event: "Natal - Feriado" },
    { date: "01/01", event: "Ano Novo - Feriado" },
    { date: "15/01", event: "Fechamento de Metas Q4" },
  ],
  sipat: {
    show: true,
    lastUpdated: "27/11/2025",
    title: "Cronograma SIPAT 2025",
    subtitle: "De 01 a 05/12 – confira as atividades por dia.",
    days: [
      {
        date: "2025-12-01",
        label: "01/12 – SEGUNDA",
        activities: [
          { time: "08h", location: "Auditório", title: "Abertura Oficial" },
          { time: "08h20 - 09h", location: "Auditório", title: "Palestra: Saúde Mental" },
          { time: "11h00 - 13h30", location: "Estacionamento", title: "Stands Bracol & Luvex + Quiz SIPAT" },
        ],
      },
      {
        date: "2025-12-02",
        label: "02/12 – TERÇA",
        activities: [
          { time: "08h", location: "Auditório", title: "Abertura SESMT & CIPA" },
          { time: "08h20 - 09h", location: "Auditório", title: "Palestra: Educação no Trânsito" },
          { time: "11h00 - 13h30", location: "Estacionamento", title: "Stands DETRAN, Tramontina e Cacau Show" },
        ],
      },
      {
        date: "2025-12-03",
        label: "03/12 – QUARTA",
        activities: [
          { time: "08h", location: "Auditório", title: "Abertura SESMT & CIPA" },
          { time: "08h20 - 09h", location: "Auditório", title: "Palestra: Segurança no Trabalho" },
          { time: "11h00 - 13h30", location: "Estacionamento", title: "Stands Greentec, Danny & Vicsa + Quiz SIPAT" },
        ],
      },
      {
        date: "2025-12-04",
        label: "04/12 – QUINTA",
        activities: [
          { time: "08h", location: "Auditório", title: "Abertura SESMT & CIPA" },
          { time: "08h20 - 09h", location: "Auditório", title: "Aula: Defesa Pessoal (KRAV MAGÁ)" },
          { time: "11h00 - 13h30", location: "Estacionamento", title: "Stands 3M e Cacau Show" },
        ],
      },
      {
        date: "2025-12-05",
        label: "05/12 – SEXTA",
        activities: [
          { time: "08h", location: "Auditório", title: "Encerramento Oficial" },
          { time: "08h20 - 09h", location: "Auditório", title: "Show de Talentos Grupo FIOFORTE" },
          { time: "11h00 - 13h30", location: "Estacionamento", title: "Quiz SIPAT" },
        ],
      },
    ],
  },
  institutional: [
    {
      key: "denuncias",
      title: "Canal de Denúncias",
      description: "Ambiente seguro e confidencial",
      icon: "shield",
      url: "https://grupofioforte.com.br/canal-de-denuncias",
    },
    {
      key: "privacidade",
      title: "Política de Privacidade",
      description: "Conheça nossos termos e a LGPD",
      icon: "file-text",
      url: "https://grupofioforte.com.br/politica-de-privacidade",
    },
  ],
  footer: {
    text: "© 2025 Grupo FIOFORTE – Todos os direitos reservados.",
  },
};
