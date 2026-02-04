import { MaterialData } from '../Material';

export default class DepthMaterialData implements MaterialData {
  type: string = 'depth';
  constructor(
    public displacementBias = 0,
    public displacementScale = 1,
    public wireframe = false,
    public wireframeLinecap = 'round',
    public wireframeLinewidth = 1,
  ) {}
}
