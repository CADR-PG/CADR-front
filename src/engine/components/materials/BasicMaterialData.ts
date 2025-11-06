import { Euler, MeshBasicMaterialParameters, MultiplyOperation } from 'three';
import { MaterialData } from '../Material';

export default class BasicMaterialData implements MaterialData {
  type: string = 'basic';
  constructor(
    public parameters: MeshBasicMaterialParameters = {
      aoMapIntensity: 1,
      color: 'orange',
      combine: MultiplyOperation,
      envMapRotation: new Euler(0, 0, 0),
      fog: true,
      lightMapIntensity: 1,
      reflectivity: 1,
      refractionRatio: 0.98,
      wireframe: false,
      wireframeLinecap: 'round',
      wireframeLinejoin: 'round',
      wireframeLinewidth: 1,
    },
  ) {}
}
