import { MeshBasicMaterialParameters, MultiplyOperation } from 'three';
import { MaterialData } from '../Material';

type MeshBasicMaterialParametersData = Omit<
  MeshBasicMaterialParameters,
  'envMapRotation'
> & {
  envMapRotation: [number, number, number];
};

export default class BasicMaterialData implements MaterialData {
  type: string = 'basic';
  constructor(
    public parameters: MeshBasicMaterialParametersData = {
      aoMapIntensity: 1,
      color: 'orange',
      combine: MultiplyOperation,
      envMapRotation: [0, 0, 0],
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
