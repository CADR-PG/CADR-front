import { Divider, MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { useEditorContext } from '../../hooks/useEditorContext';
import Objects from '../../data/ObjectNames';
import { ECS } from '../../engine/ECS';
import Material from '../../engine/components/Material';
import Transform from '../../engine/components/Transform';
import Geometry from '../../engine/components/Geometry';
import Name from '../../engine/components/Name';
import BasicMaterialData from '../../engine/components/materials/BasicMaterialData';
import Mesh from '../../engine/components/Mesh';
import { Camera } from '../../engine/components/Camera';

function ObjectNavigationItem() {
  const { focus } = useEditorContext();

  const handleAdd = (object: string) => {
    const entity = ECS.instance.entityManager.createEntity();
    ECS.instance.entityManager.addComponent(new Mesh(), entity);
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

  const handleAddCamera = () => {
    const entity = ECS.instance.entityManager.createEntity();
    ECS.instance.entityManager.addComponent(new Camera(), entity);
    ECS.instance.entityManager.addComponent(new Transform(), entity);
    ECS.instance.entityManager.addComponent(new Name('Camera'), entity);
    // Not marked as MainCamera - the existing main camera keeps driving
    // Play until this one is explicitly promoted in the Hierarchy panel.

    focus(entity);
  };

  return (
    <NavigationItem label="Shapes">
      <MenuItem onClick={handleAddCamera}>Camera</MenuItem>
      <Divider />
      {Object.keys(Objects).map((object) => (
        <MenuItem key={object} onClick={() => handleAdd(object)}>
          {object}
        </MenuItem>
      ))}
    </NavigationItem>
  );
}

export default ObjectNavigationItem;
