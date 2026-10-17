import { Vec3 } from '@/engine/components/Transform';
import { Entity } from '@/engine/Entity';
import { EntityToComponent } from '@/engine/EntityManager';

export default interface SceneJSON {
  camera: Vec3;
  entities: EntityToComponent;
  root: Entity | null;
}
