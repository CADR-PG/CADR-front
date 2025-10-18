export type EUID = string;

export interface Entity {
  name: string;
  // tags: string[];
  // parent: Entity;
}

export interface Entities {
  [euid: EUID]: Entity
}
