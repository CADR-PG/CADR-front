import { MultiplyOperation } from 'three';
import { MaterialData } from '../Material';

export default class BasicMaterialData implements MaterialData {
  type: string = 'basic';
  constructor(
    public aoMapIntensity = 1,
    public color = 0xffffff,
    public combine = MultiplyOperation,
    public envMapRotation = [0, 0, 0],
    public fog = true,
    public lightMapIntensity = 1,
    public reflectivity = 1,
    public refractionRatio = 0.98,
    public wireframe = false,
    public wireframeLinecap = 'round',
    public wireframeLinejoin = 'round',
    public wireframeLinewidth = 30,
  ) {}
}
