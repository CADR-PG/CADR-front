import { Entity } from '../../types/Entity';
import Material, { mapMaterialToComponent } from '../../types/Material';
import { SystemJSX } from '../../types/System';
import { ECS } from '../ECS';

export class RenderSystem extends SystemJSX {
  updateJSX(entities: Entity[]) {
    return (
      <>
        {entities.map((entity) => {
          const element =
            mapMaterialToComponent[
              (ECS.instance.getComponents(entity)['Material'] as Material).type
            ];
          return <element />;
        })}
      </>
    );
  }
}
