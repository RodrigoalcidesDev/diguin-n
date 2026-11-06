/* ============================================================
   CONFIGURAÇÃO DO SITE — edite só este arquivo para atualizar
   links, vídeos, playlists e horários das lives.
   ============================================================ */
const SITE = {
  channelId: "UCKYtpEnFuRpacRKELSqD1mQ",

  links: {
    youtube:   "https://www.youtube.com/@diguin_n",
    twitch:    "https://www.twitch.tv/diguin_n",
    tiktok:    "https://www.tiktok.com/@diguin_n",
    instagram: "https://www.instagram.com/diguin_n.lives/"
  },

  // usuário na Twitch (também usado no player e no "ao vivo")
  twitchUser: "diguin_n",

  // Horários das lives.
  // dias: 0 = Dom, 1 = Seg, 2 = Ter, 3 = Qua, 4 = Qui, 5 = Sex, 6 = Sáb
  schedule: { dias: [1, 2, 3, 4, 5], hora: "19h às 22h", jogo: "" },

  // Vídeos longos recentes (id do YouTube + título)
  videos: [
    { id: "K_X3XnOKwAw", title: "DBD - Springtrap paciente: a paciência é uma virtude" },
    { id: "ZKGGOwQpeew", title: "Storebound - o puzzle da água quase acabou com a amizade" },
    { id: "Zj_5jc6BUQA", title: "Taxa de sobrevivência negativa nesse novo jogo do Fears to Fathom" },
    { id: "2azWGfqrTDQ", title: "Fiquei sozinho em casa… até alguém aparecer na minha janela" },
    { id: "gLiais6TkDI", title: "Uma jornada Backrooms" },
    { id: "BrvVraWaYGs", title: "Enfrentando mais um hacker" }
  ],

  // Playlists públicas
  playlists: [
    { id: "PLW5u_33GttO7N7GSfvtwmOV-5JNLpO7qV", title: "Resident Evil Village" },
    { id: "PLW5u_33GttO540e7sBgVVZg_jQvgzoUdF", title: "Evolve" },
    { id: "PLW5u_33GttO4AaDPwiRyd2cVs6wMrniO9", title: "Fobia - St. Dinfna Hotel" }
  ],

  // Shorts (os mesmos vídeos que vão para TikTok e Instagram)
  shorts: [
    { id: "jJctZHPf8eI", title: "Por que sempre é a Sable?" },
    { id: "HBn9WUSaLnY", title: "A Loja Pirata do Fortnite foi um tiro no pé da Epic?" },
    { id: "81NjWsQWvy4", title: "Fui beber água e ganhei a loja pirata no Fortnite" },
    { id: "yzLXbN4C2mI", title: "Roubamos um avião, olha no que deu" },
    { id: "vCOxPovAqL8", title: "Ninguém esperava isso" },
    { id: "Zcl6qlSmQXQ", title: "Toda partida tem alguém como esse Dustin" }
  ]
};

/* Se existir data.json (gerado todo dia pelo GitHub), ele troca vídeos e shorts
   pelos mais recentes. Se não existir, vale o que está escrito acima. */
SITE.ready = fetch("data.json", { cache: "no-cache" })
  .then(r => (r.ok ? r.json() : {}))
  .then(d => {
    if (d.videos && d.videos.length) SITE.videos = d.videos;
    if (d.shorts && d.shorts.length) SITE.shorts = d.shorts;
  })
  .catch(() => {});

const thumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytWatch = id => `https://www.youtube.com/watch?v=${id}`;
const ytPlaylist = id => `https://www.youtube.com/playlist?list=${id}`;
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ícones usados nas telas */
const ICON = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>'
};
