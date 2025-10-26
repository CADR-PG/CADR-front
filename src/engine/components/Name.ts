import { Component } from "../Component";

export default class Name extends Component {
  constructor(displayName: string) {
    super();
    this.displayName = displayName;
  }
  name = "Name";
  displayName: string
}
