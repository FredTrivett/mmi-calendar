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

const groups = {
  mmi1: ["G1", "G21", "G22", "G3"],
  mmi2: ["G1", "G21", "G22", "G3"],
  mmi3: ["G1", "G21", "G22", "G3"],
};

// show/hide year
let yearKeys = Object.keys(groups);

for (let year of yearKeys) {
  let checkbox = document.getElementById(year);

  checkbox.addEventListener("change", function () {
    let events = [];

    for (let year of yearKeys) {
      let checkbox = document.getElementById(year);
      if (checkbox.checked) {
        events = events.concat(M.getEvents(year));
      }
    }

    let searchText = search.value.toLowerCase();
    events = events.filter(event => event.title.toLowerCase().includes(searchText));

    V.uicalendar.clear();
    V.uicalendar.createEvents(events);

    // Update state
    state.checkboxes.year[year] = checkbox.checked;
    console.log(state);
    localStorage.setItem('state', JSON.stringify(state));
  });
}

// show/hide groups
for (let year of yearKeys) {
  let groupId = document.getElementById(year + "Select");

  groupId.addEventListener("change", function () {
    let groupCalendar = groupId.value;
    console.log(groupCalendar);
    V.uicalendar.clear();

    let events = M.getEvents(year);
    events = events.filter(event => event.group.toString().includes(groupCalendar));
    let searchText = search.value.toLowerCase().split(" ");
    events = events.filter(event => {
      return searchText.every(keyword => {
        return event.title.toLowerCase().includes(keyword) || event.location.toLowerCase().includes(keyword);
      });
    });

    V.uicalendar.createEvents(events);

    // Update state
    state.selects.year[year] = groupCalendar;
    console.log(state);
    localStorage.setItem('state', JSON.stringify(state));
  });
}

// search input
let search = document.getElementById("search");
search.addEventListener("input", () => {
  let searchText = search.value.toLowerCase().split(" ");
  let events = [];

  for (let year of yearKeys) {
    let checkbox = document.getElementById(year);
    if (checkbox.checked) {
      events = events.concat(M.getEvents(year));
    }
  }

  events = events.filter(event => {
    return searchText.every(keyword => {
      return event.title.toLowerCase().includes(keyword) || event.location.toLowerCase().includes(keyword);
    });
  });

  V.uicalendar.clear();
  V.uicalendar.createEvents(events);
});

// display day, week or month
const viewButtons = [
  { button: btnDay, view: 'day' },
  { button: btnWeek, view: 'week' },
  { button: btnMonth, view: 'month' }
];

for (let { button, view } of viewButtons) {
  button.addEventListener('click', () => {
    V.uicalendar.changeView(view);
    state.view.current = view; // Store the chosen view in the state
    console.log(state);
    localStorage.setItem('state', JSON.stringify(state));
  });
}

const storedState = localStorage.getItem('state');
if (storedState) {
  const parsedState = JSON.parse(storedState);
  const storedView = parsedState.view.current;
  V.uicalendar.changeView(storedView);
}

const state = {
  selects: {
    year: yearKeys.reduce((acc, year) => { // acc = accumulator 
      acc[year] = document.getElementById(year + "Select").value; // acc[year] = acc.mmi1 = document.getElementById("mmi1Select").value
      return acc;
    }, {})
  },
  checkboxes: {
    year: yearKeys.reduce((acc, year) => {
      acc[year] = document.getElementById(year).checked;
      return acc;
    }, {})
  },
  view: {
    current: window.matchMedia('(max-width: 768px)').matches ? 'day' : 'week' // Set the current view based on device width
  }
};

// Retrieve stored state from local storage
const storedSelect = localStorage.getItem('state');

if (storedSelect) {
  const parsedState = JSON.parse(storedSelect);

  // Apply stored values to checkboxes
  for (let year of yearKeys) {
    const checkbox = document.getElementById(year);
    if (parsedState.checkboxes.year[year]) {
      checkbox.click(); // Simulate a click event to check the checkbox
    }
  }

  // Apply stored values to selects
  for (let year of yearKeys) {
    const select = document.getElementById(year + "Select");
    if (parsedState.selects.year[year]) {
      select.value = parsedState.selects.year[year];
    }
  }

  // Apply stored view
  const storedView = parsedState.view.current;
  V.uicalendar.changeView(storedView);
}



