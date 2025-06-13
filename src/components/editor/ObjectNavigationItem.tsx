import { MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { useEditorContext } from '../../hooks/useEditorContext';
import { SceneObject } from '../../types/SceneObject';
import Objects from '../../data/ObjectNames';

function ObjectNavigationItem() {
  const { sceneObjects, setSceneObjects, focus } = useEditorContext();

  const handleAdd = (object: SceneObject) => {
    const uuid = crypto.randomUUID();
    setSceneObjects({ ...sceneObjects, [uuid]: object });
    focus(uuid);
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
