import { MaterialData } from '../Material';

export default class NormalMaterialData implements MaterialData {
  type: string = 'normal';
  constructor(
    public flatShading = false,
    public wireframe = false,
  ) {}
}
