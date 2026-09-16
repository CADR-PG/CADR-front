import { Divider, MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { useEditorContext } from '../../hooks/useEditorContext';
import Objects from '../../data/ObjectNames';
import { ECS } from '../../engine/ECS';
import Material from '../../engine/components/Material';
import Transform from '../../engine/components/Transform';
import Geometry from '../../engine/components/Geometry';
import Name from '../../engine/components/Name';
import { Camera } from '../../engine/components/Camera';
import GeometryItem from '../../types/GeometryItem';
import BasicMaterialData from '../../engine/components/materials/BasicMaterialData';

function ObjectNavigationItem() {
  const { focus } = useEditorContext();

  const handleAdd = (object: GeometryItem) => {
    const entity = ECS.instance.entityManager.createEntity();
    ECS.instance.entityManager.addComponent(
      new Material(new BasicMaterialData()),
      entity,
    );
    ECS.instance.entityManager.addComponent(new Transform(), entity);
    ECS.instance.entityManager.addComponent(
      new Geometry(new object.geometry()),
      entity,
    );
    ECS.instance.entityManager.addComponent(new Name(object.name), entity);

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
      {Objects.map((object) => (
        <MenuItem key={object.name} onClick={() => handleAdd(object)}>
          {object.name}
        </MenuItem>
      ))}
    </NavigationItem>
  );
}

export default ObjectNavigationItem;
