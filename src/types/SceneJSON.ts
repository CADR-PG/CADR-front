import { Vec3 } from '@/engine/components/Transform';
import { EntityToComponent } from '@/engine/EntityManager';

export default interface SceneJSON {
  camera: Vec3;
  entities: EntityToComponent;
}
