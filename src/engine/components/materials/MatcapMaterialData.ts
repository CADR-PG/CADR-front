import { MaterialData } from '../Material';

export default class MatcapMaterialData implements MaterialData {
  type: string = 'matcap';
  constructor(
    public color = 0xffffff,
    public fog = true,
  ) {}
}
