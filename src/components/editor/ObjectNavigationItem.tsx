import { MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { useEditorContext } from '../../hooks/useEditorContext';
import Objects from '../../data/ObjectNames';
import { ECS } from '../../engine/ECS';
import Material from '../../engine/components/Material';
import Transform from '../../engine/components/Transform';
import Geometry from '../../engine/components/Geometry';
import Name from '../../engine/components/Name';
import BasicMaterialData from '../../engine/components/materials/BasicMaterialData';

function ObjectNavigationItem() {
  const { focus } = useEditorContext();

  const handleAdd = (object: string) => {
    const entity = ECS.instance.entityManager.createEntity();
    ECS.instance.entityManager.addComponent(
      new Material(new BasicMaterialData()),
      entity,
    );
    ECS.instance.entityManager.addComponent(new Transform(), entity);
    ECS.instance.entityManager.addComponent(
      new Geometry(new Objects[object]()),
      entity,
    );
    ECS.instance.entityManager.addComponent(new Name(object), entity);

    focus(entity);
  };

  return (
    <NavigationItem label="Shapes">
      {Object.keys(Objects).map((object) => (
        <MenuItem key={object} onClick={() => handleAdd(object)}>
          {object}
        </MenuItem>
      ))}
    </NavigationItem>
  );
}

export default ObjectNavigationItem;
