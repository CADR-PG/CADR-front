import { LightData } from '../Light';

export default class DirectionalLightData implements LightData {
  type: string = 'directional';
  constructor(
    public color = 0xffffff,
    public intensity = 1,
    public castShadow = false,
  ) {}
}
