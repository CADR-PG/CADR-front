import { MenuItem } from '@mui/material';
import Objects from '../../data/ObjectNames';
import NavigationItem from './NavigationItem';
import { SceneObject } from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';

function Navigation() {
  const { sceneObjects, setSceneObjects } = useEditorContext();

  const handleAdd = (object: SceneObject) => {
    const uuid = crypto.randomUUID();
    setSceneObjects({ ...sceneObjects, [uuid]: object });
  };

  return (
    <div className="tool-bar">
      <NavigationItem label="Shapes">
        {Objects.map((object) => (
          <MenuItem key={object.id} onClick={() => handleAdd(object)}>
            {object.name}
          </MenuItem>
        ))}
      </NavigationItem>
    </div>
  );
}

export default Navigation;
