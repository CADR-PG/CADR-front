import { MaterialData } from '../Material';

export default class PhysicalMaterialData implements MaterialData {
  type: string = 'physical';
  constructor(
    public color = 0xffffff,
    public metalness = 0,
    public roughness = 0.5,
    public reflectivity = 1,
    public clearcoat = 0,
    public clearcoatRoughness = 0,
    public sheen = 0,
    public transmission = 0,
    public thickness = 0,
    public ior = 1.5,
    public opacity = 1,
    public transparent = false,
    public envMapIntensity = 1,
    public emissive = 0x000000,
    public emissiveIntensity = 1,
    public aoMapIntensity = 1,
    public lightMapIntensity = 1,
    public fog = true,
    public wireframe = false,
    public wireframeLinecap = 'round',
    public wireframeLinejoin = 'round',
    public wireframeLinewidth = 1,
  ) {}
}
