import { LightData } from '../Light';

export default class AmbienLightData implements LightData {
  type: string = 'ambient';
  constructor(
    public color = 0xffffff,
    public intensity = 1,
    public castShadow = false,
  ) {}
}
