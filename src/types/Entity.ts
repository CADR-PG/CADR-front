export type EUID = string;

// TODO: I kinda wanted to limit the entity to a single number,
// but I think we will need way more functionality than that.
// Keeping the name of the entity to display in the scene graph
// and keeping the relations between them. Maybe those should
// be components? Name and relation component goes kinda hard ngl.
export interface Entity {
  name: string;
  // tags: string[];
  // parent: Entity;
}

export interface Entities {
  [euid: EUID]: Entity;
}
