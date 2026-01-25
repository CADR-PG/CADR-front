import { LightData } from '../engine/components/Light';

export default interface LightItems {
  [name: string]: new () => LightData;
}
