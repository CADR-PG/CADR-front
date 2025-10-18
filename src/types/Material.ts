import { Component } from "./Component";

export default interface Material extends Component {
  type: "Material";
  opacity: number;
}
