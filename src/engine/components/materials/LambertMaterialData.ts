import { MaterialData } from '../Material';

export default class LambertMaterialData implements MaterialData {
  type: string = 'lambert';
  constructor(
    public aoMapIntensity = 1,
    public color = 0xffffff,
    public emissive = 0x000000,
    public emissiveIntensity = 1,
    public fog = true,
    public lightMapIntensity = 1,
    public wireframe = false,
    public wireframeLinecap = 'round',
    public wireframeLinejoin = 'round',
    public wireframeLinewidth = 1,
  ) {}
}
