import { Entity } from '../engine/Entity';
import { EntityToComponent } from '../engine/ComponentManager';

interface SceneData {
  id: string;
  data: {
    entities: Entity[];
    components: EntityToComponent;
  };
}

export default SceneData;
