import { MaterialData } from '../Material';

export default class PhongMaterialData implements MaterialData {
  type: string = 'phong';
  constructor(
    public aoMapIntensity = 1,
    public color = 0xffffff,
    public fog = true,
    public lightMapIntensity = 1,
    public specular = 0x111111,
    public shininess = 30,
    public emissive = 0x000000,
    public emissiveIntensity = 1,
    public reflectivity = 1,
    public refractionRatio = 0.98,
    public wireframe = false,
    public wireframeLinecap = 'round',
    public wireframeLinejoin = 'round',
    public wireframeLinewidth = 1,
  ) {}
}
