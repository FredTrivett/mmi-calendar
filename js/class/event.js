class Event {
  #id;
  #summary;
  #description;
  #start;
  #end;
  #location;
  #groups; // toutes les information utiles
  // les groupes sont deja fait

  constructor(id, summary, description, start, end, location, sourceFile) {
    this.#id = id;
    this.#summary = summary.slice(0, summary.lastIndexOf(","));
    this.#description = description;
    this.#start = new Date(start);
    this.#end = new Date(end);
    this.#location = location;

    this.#groups = summary.slice(summary.lastIndexOf(",") + 1);
    this.#groups = this.#groups.split(".");
    this.#groups = this.#groups.map((gr) => gr.replace(/\s/g, ""));
    this.sourceFile = sourceFile;
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
      // font partie de icalendar
    };
  }
}

export { Event };
