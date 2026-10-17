import { LightData } from '../Light';

export default class PointLightData implements LightData {
  type: string = 'point';
  constructor(
    public color = 0xffffff,
    public intensity = 1,
    public distance = 100,
    public decay = 1,
    public castShadow = false,
  ) {}
}
