import { MaterialData } from '../Material';

export default class ToonMaterialData implements MaterialData {
  type: string = 'toon';
  constructor(
    public color = 0xffffff,
    public emissive = 0x000000,
    public emissiveIntensity = 1,
    public opacity = 1,
    public transparent = false,
    public fog = true,
    public wireframe = false,
    public wireframeLinecap = 'round',
    public wireframeLinejoin = 'round',
    public wireframeLinewidth = 1,
  ) {}
}
