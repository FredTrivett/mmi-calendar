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

V.uicalendar.createEvents(
  M.getEvents("mmi1").concat(M.getEvents("mmi2"), M.getEvents("mmi3"))
);

// create buttons to go to the next and previous week in the calendar and current week
let btnPrev = document.getElementById("btnPrev");
let btnNext = document.getElementById("btnNext");
let btnToday = document.getElementById("btnToday");

btnPrev.addEventListener("click", () => {
  V.uicalendar.prev();
});

btnNext.addEventListener("click", () => {
  V.uicalendar.next();
});

btnToday.addEventListener("click", () => {
  V.uicalendar.today();
});

// give default colors to the calendars
const calendarDefault = {
  mmi1: {
    color: "#ffffff",
    backgroundColor: "#fb5607",
    borderColor: "",
    dragBackgroundColor: "",
  },
  mmi2: {
    color: "#ffffff",
    backgroundColor: "#8338ec",
    borderColor: "",
    dragBackgroundColor: "",
  },
  mmi3: {
    color: "#ffffff",
    backgroundColor: "#3a86ff",
    borderColor: "",
    dragBackgroundColor: "",
  },
};

for (let calendar in calendarDefault) {
  V.uicalendar.setCalendarColor(calendar, calendarDefault[calendar]);
}

// change the individual events colors
const calendarColors = {
  mmi1: {
    CM: "#af3c04",
    TD: "#fc8851",
    TP: "#fdccb4",
  },
  mmi2: {
    CM: "#4e218d",
    TD: "#b487f3",
    TP: "#e6d7fb",
  },
  mmi3: {
    CM: "#225099",
    TD: "#9cc2ff",
    TP: "#ebf2ff",
  },
};

for (let calendar in calendarColors) { // for each calendar
  let events = M.getEvents(calendar); // get the events of the calendar
  for (let event of events) { // for each event
    for (let type in calendarColors[calendar]) { // for each type of event
      if (event.title.includes(type)) { // if the event title contains the type of the event
        let changes = {
          backgroundColor: calendarColors[calendar][type], // change the background color of the event
        };
        V.uicalendar.updateEvent(event.id, event.calendarId, changes); // update the event color
      }
    }
  }
}

// choose mmi
// detect if the checkbox is checked or not, if checked, the calendar will show the events of the class
// if not, the calendar will not show the events of the class
// the checkbox is checked by default

const calendars = ["mmi1", "mmi2", "mmi3"];

for (let calendar of calendars) {
  let checkbox = document.getElementById(calendar); // get the checkbox 

  checkbox.addEventListener("change", function () { // when the checkbox is checked or unchecked
    V.uicalendar.setCalendarVisibility(calendar, this.checked); // show or hide the calendar
  });

  V.uicalendar.setCalendarVisibility(calendar, checkbox.checked); // show the calendar by default
}
