class Event {
  #id;
  #summary;
  #description;
  #start;
  #end;
  #location;
  #year;
  #groups; // toutes les information utiles
  // les groupes sont deja fait
  #calendarColours = {
    mmi1: {
      CM: "#af3c04",
      TD: "#fc8851",
      TP: "#fdccb4",
      Default: "#fb5607",
    },
    mmi2: {
      CM: "#4e218d",
      TD: "#b487f3",
      TP: "#e6d7fb",
      Default: "#8338ec",
    },
    mmi3: {
      CM: "#225099",
      TD: "#9cc2ff",
      TP: "#ebf2ff",
      Default: "#3a86ff",
    },
  };

  constructor(id, summary, description, start, end, location, year) {
    this.#id = id;
    this.#summary = summary.slice(0, summary.lastIndexOf(","));
    this.#description = description;
    this.#start = new Date(start);
    this.#end = new Date(end);
    this.#location = location;

    this.#groups = summary.slice(summary.lastIndexOf(",") + 1);
    this.#groups = this.#groups.split(".");
    this.#groups = this.#groups.map((gr) => gr.replace(/\s/g, ""));
    this.#year = year;
  }

  // pour faire des accesseur -> regarder dans la doc
  get id() {
    return this.#id;
  }

  get summary() {
    return this.#summary;
  }

  get description() {
    return this.#description;
  }

  get start() {
    return this.#start;
  }

  get end() {
    return this.#end;
  }

  get location() {
    return this.#location;
  }

  get groups() {
    return this.#groups.map((gr) => gr); // retourne une copie du tableau
  }

  get colour() {
    const allColours = {
      TP: this.#calendarColours[this.#year].TP,
      TD: this.#calendarColours[this.#year].TD,
      CM: this.#calendarColours[this.#year].CM,
      Default: this.#calendarColours[this.#year].Default,
    }

    for (let individualColor in allColours) {
      if (this.#summary.includes(individualColor)) {
        return allColours[individualColor];
      }
    }
    return allColours.Default;
  };


  // retourne un objet contenant les informations de l'événement
  // dans un format compatible avec Toast UI Calendar (voir https://nhn.github.io/tui.calendar/latest/EventObject)
  toObject() {
    // console.log(this.#summary);
    return {
      id: this.#id,
      title: this.#summary,
      body: this.#description,
      start: this.#start,
      end: this.#end,
      location: this.#location,
      backgroundColor: this.colour,
      borderColor: this.colour,
      group: this.#groups
    };
  }
}

export { Event };
