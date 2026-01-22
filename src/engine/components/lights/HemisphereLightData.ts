import { LightData } from '../Light';

export default class HemisphereLightData implements LightData {
  type: string = 'hemisphere';
  constructor(
    public skyColor = 0xffffff,
    public groundColor = 0xffffff,
    public intensity = 1,
    public castShadow = false,
  ) {}
}
