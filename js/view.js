import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

let V = {};

V.uicalendar = new Calendar("#calendar", {
  // #calendar est dans le main de index.html
  defaultView: "week", // affichage semaine par défaut
  isReadOnly: true, // on ne peut pas modifier le calendrier
  usageStatistics: false, // on ne veut pas envoyer de statistiques d'utilisation
  useDetailPopup: true, // on veut une popup pour les détails
  week: {
    startDayOfWeek: 1, // on veut que la semaine commence le lundi
    dayNames: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], // on veut que les jours soient affichés en français
    workweek: true, // on veut que le week-end soit masqué
    hourStart: 8, // on veut que la journée commence à 8h
    hourEnd: 20, // on veut que la journée se termine à 20h
    taskView: false, // on ne veut pas afficher les tâches
    eventView: ["time"], // on veut afficher les événements sous forme de barre
  },
  month: {
    startDayOfWeek: 1, // on veut que la semaine commence le lundi
    dayNames: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], // on veut que les jours soient affichés en français
    workweek: true, // on veut que le week-end soit masqué
    hourStart: 8, // on veut que la journée commence à 8h
    hourEnd: 20, // on veut que la journée se termine à 20h
    taskView: false, // on ne veut pas afficher les tâches
    eventView: ["time"], // on veut afficher les événements sous forme de barre
  },
  template: {
    time: function (event) {
      // on veut que les événements soient affichés en blanc
      return `<span style="color: black;">${event.title}</span>`;
    },
  },
  // un calendrier comment il faut le declarer pour toast UI
});

export { V };
