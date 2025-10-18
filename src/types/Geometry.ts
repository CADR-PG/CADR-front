import Component from './Component';

export default interface Geometry extends Component {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}
