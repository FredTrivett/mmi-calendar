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

const calendars = ["mmi1", "mmi2", "mmi3"];

const groups = {
  mmi1: ["G1", "G2", "G3", "G4"],
  mmi2: ["G1", "G21", "G22", "G3"],
  mmi3: ["G1", "G21", "G22", "G3"],
};

// show/hide year
let yearKeys = Object.keys(groups);

for (let year of yearKeys) {
  let checkbox = document.getElementById(year);

  checkbox.addEventListener("change", function () {
    V.uicalendar.setCalendarVisibility(year, this.checked);
  });

  V.uicalendar.setCalendarVisibility(year, checkbox.checked);
}

// show/hide groups
for (let year of yearKeys) {
  let groupId = document.getElementById(year + "Select");
  groupId.addEventListener("change", function () {
    let groupCalendar = groupId.value;
    console.log(groupCalendar);

    let events = M.getEvents(year);
    // console.log(year);
    for (let event of events) {
      let changes = {};
      if (event.group.toString().includes(groupCalendar)) {
        changes.isVisible = true;
      } else {
        changes.isVisible = false;
      }
      V.uicalendar.updateEvent(event.id, event.calendarId, changes);
    }
  });

}

// let events1 = M.getEvents("mmi1");
// for (let event of events1) {
//   if (event.title.includes(" CM ")) {
//     let changes = {
//       backgroundColor: "#af3c04",
//     };

//     V.uicalendar.updateEvent(event.id, event.calendarId, changes);
//   }
// attendies 