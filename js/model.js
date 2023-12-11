import ical from "ical";
import { EventManager } from "./class/event-manager";

let Events = {
  mmi1: null,
  mmi2: null,
  mmi3: null,
}; // les donnes sont stockées ici, il n'est pas exporter donc pas visible depuis l'extérieur personne ne peut les modifier

let M = {}; // on ne met que ce que l'on veut rendre visible depuis l'extérieur
// c'est de l'encapsulation

M.getEvents = function (annee) {
  if (annee in Events) {
    return Events[annee].toObject();
  }
  return null;
};

M.init = async function () {
  let data = {};

  // Load mmi1.ics
  let response1 = await fetch("./data/mmi1.ics");
  let text1 = await response1.text();
  data.mmi1 = ical.parseICS(text1);

  // Load mmi2.ics
  let response2 = await fetch("./data/mmi2.ics");
  let text2 = await response2.text();
  data.mmi2 = ical.parseICS(text2);

  // Load mmi3.ics
  let response3 = await fetch("./data/mmi3.ics");
  let text3 = await response3.text();
  data.mmi3 = ical.parseICS(text3);

  Events.mmi1 = new EventManager("mmi1", "MMI 1", "Agenda des MMI 1");
  Events.mmi1.addEvents(data.mmi1);

  Events.mmi2 = new EventManager("mmi2", "MMI 2", "Agenda des MMI 2");
  Events.mmi2.addEvents(data.mmi2);

  Events.mmi3 = new EventManager("mmi3", "MMI 3", "Agenda des MMI 3");
  Events.mmi3.addEvents(data.mmi3);

  // console.log(Events.mmi1);
};

export { M };

/*
    On notera que si tout ce qui est dans ce fichier concerne le modèle, seul ce qui est dans M est exporté (et donc accessible depuis l'extérieur).
    C'est une façon de faire qui permet de garder privé les données "réelles" qui sont dans Events mais dont la visibilité est limitée à ce module/fichier.
    Donc il faut voir M comme la partie publique de la vue et le reste comme la partie privée.
    C'est sensiblement différent de ce qu'on faisait jusqu'à présent où tout était dans l'objet M.
    L'utilisation des modules javascript nous permet ici de choisir ce que l'on veut rendre public ou privé.
    C'est une autre façon d'implémenter le concept d'encapsulation sans avoir à utiliser les classes.
    A noter qu'on aurait pu faire une classe "Model" mais dans la mesure où l'on n'aurait qu'une seule instance de Model, ce n'est pas vraiment utile.
    
*/
