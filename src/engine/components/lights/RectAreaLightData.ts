import { LightData } from '../Light';

export default class RectAreaLightData implements LightData {
  type: string = 'rectarea';
  constructor(
    public color = 0xffffff,
    public intensity = 1,
    public width = 10,
    public height = 10,
  ) {}
}
