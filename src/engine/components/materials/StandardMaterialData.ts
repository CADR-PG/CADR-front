import { MaterialData } from '../Material';

export default class StandardMaterialData implements MaterialData {
  type: string = 'standard';
  constructor(
    public color = 0xffffff,
    public metalness = 0,
    public roughness = 0.5,
    public envMapIntensity = 1,
    public aoMapIntensity = 1,
    public lightMapIntensity = 1,
    public bumpScale = 1,
    public normalScale: [number, number] = [1, 1],
    public displacementScale = 1,
    public displacementBias = 0,
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
