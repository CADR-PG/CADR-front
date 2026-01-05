import { MaterialData } from '../engine/components/Material';

export default interface MaterialItems {
  [name: string]: new () => MaterialData;
}
