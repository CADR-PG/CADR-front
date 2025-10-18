export type CUID = string;

export interface Component { }

export interface Components {
  [cuid: CUID]: Component;
}
