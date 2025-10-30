import { MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { useEditorContext } from '../../hooks/useEditorContext';
import { SceneObject } from '../../types/SceneObject';
import Objects from '../../data/ObjectNames';
import { ECS } from '../../engine/ECS';
import Material, { BasicMaterialData } from '../../engine/components/Material';
import Transform from '../../engine/components/Transform';
import Geometry, { BoxGeometryData } from '../../engine/components/Geometry';
import Name from '../../engine/components/Name';

function ObjectNavigationItem() {
  const { sceneObjects, setSceneObjects, focus } = useEditorContext();

  const handleAdd = (object: SceneObject) => {
    //const uuid = crypto.randomUUID();
    //setSceneObjects({ ...sceneObjects, [uuid]: object });
    const entity = ECS.instance.entityManager.createEntity();
    const materialData: BasicMaterialData = {
      color: 0xff0000,
    };
    ECS.instance.entityManager.addComponent(
      new Material('basic', materialData),
      entity,
    );
    ECS.instance.entityManager.addComponent(
      new Transform([0, 0, 0], [0, 0, 0], [1, 1, 1]),
      entity,
    );
    const geometryData: BoxGeometryData = {
      dimensions: [2, 2, 2],
    };
    ECS.instance.entityManager.addComponent(
      new Geometry('box', geometryData),
      entity,
    );
    ECS.instance.entityManager.addComponent(new Name('Box'), entity);

    focus(entity);
  };

  return (
    <NavigationItem label="Shapes">
      {Objects.map((object) => (
        <MenuItem key={object.name} onClick={() => handleAdd(object)}>
          {object.name}
        </MenuItem>
      ))}
    </NavigationItem>
  );
}

export default ObjectNavigationItem;
