import { MenuItem } from '@mui/material';
import Objects from '../../data/ObjectNames';
import NavigationItem from './NavigationItem';
import { SceneObject } from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';

function Navigation() {
  const { sceneObjects, setSceneObjects } = useEditorContext();

  const handleAdd = (object: typeof Objects[0]) => {
    const uuid = crypto.randomUUID();
    const newObject: SceneObject = {
      geometryType: object.name,
      component: <object.component uuid={uuid} />
    };
    setSceneObjects({...sceneObjects, [uuid]: newObject})
  };

  return (
    <div className="tool-bar">
      <NavigationItem label="Shapes">
        {Objects.map((object) => (
          <MenuItem
            key={object.id}
            onClick={() => handleAdd(object)}
          >
            {object.name}
          </MenuItem>
        ))}
      </NavigationItem>
    </div>
  );
}

export default Navigation;
