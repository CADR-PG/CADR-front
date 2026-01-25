import { LightData } from '../Light';

export default class SpotLightData implements LightData {
  type: string = 'spotlight';
  constructor(
    public color = 0xffffff,
    public intensity = 1,
    public distance = 0,
    public angle = Math.PI / 3,
    public penumbra = 0,
    public decay = 2,
    public castShadow = false,
  ) {}
}
