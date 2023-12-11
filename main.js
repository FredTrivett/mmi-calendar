import { M } from "./js/model.js";
import { V } from "./js/view.js";

window.M = M; // on enregistre M dans la fenêtre pour pouvoir l'utiliser dans la console

/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/

// loadind data (and wait for it !)
await M.init(); // on attend que les données soient chargées

// creating events in the calendar
// V.uicalendar.createEvents(M.getEvents("mmi1"));
V.uicalendar.createEvents(
  M.getEvents("mmi1").concat(M.getEvents("mmi2"), M.getEvents("mmi3"))
);
// V.uicalendar.createEvents(M.getEvents("mmi3"));

// create buttons to go to the next and previous week in the calendar and current week
let btnPrev = document.getElementById("btnPrev");
let btnNext = document.getElementById("btnNext");
let btnToday = document.getElementById("btnToday");

// make the buttons work
btnPrev.addEventListener("click", () => {
  V.uicalendar.prev();
});

btnNext.addEventListener("click", () => {
  V.uicalendar.next();
});

btnToday.addEventListener("click", () => {
  V.uicalendar.today();
});

// change calendars colors
V.uicalendar.setCalendarColor("mmi1", {
  color: "#ffffff",
  backgroundColor: "#fb5607",
  borderColor: "",
  dragBackgroundColor: "",
});

V.uicalendar.setCalendarColor("mmi2", {
  color: "#ffffff",
  backgroundColor: "#8338ec",
  borderColor: "",
  dragBackgroundColor: "",
});

V.uicalendar.setCalendarColor("mmi3", {
  color: "#ffffff",
  backgroundColor: "#3a86ff",
  borderColor: "",
  dragBackgroundColor: "",
});

//===================== mmi1 =====================
let events1 = M.getEvents("mmi1");
for (let event of events1) {
  if (event.title.includes(" CM ")) {
    let changes = {
      backgroundColor: "#af3c04",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  if (event.title.includes(" TD ")) {
    let changes = {
      backgroundColor: "#fc8851",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  if (event.title.includes(" TP ")) {
    let changes = {
      backgroundColor: "#fdccb4",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
}

//===================== mmi2 =====================
let events2 = M.getEvents("mmi2");
for (let event of events2) {
  if (event.title.includes(" CM ")) {
    let changes = {
      backgroundColor: "#4e218d",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  if (event.title.includes(" TD ")) {
    let changes = {
      backgroundColor: "#b487f3",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  if (event.title.includes(" TP ")) {
    let changes = {
      backgroundColor: "#e6d7fb",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
}

//===================== mmi3 =====================
let events3 = M.getEvents("mmi3");
for (let event of events3) {
  if (event.title.includes(" CM ")) {
    let changes = {
      backgroundColor: "#225099",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  if (event.title.includes(" TD ")) {
    let changes = {
      backgroundColor: "#9cc2ff",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
  if (event.title.includes(" TP ")) {
    let changes = {
      backgroundColor: "#ebf2ff",
    };

    V.uicalendar.updateEvent(event.id, event.calendarId, changes);
  }
}
