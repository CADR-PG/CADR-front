import { MenuItem } from '@mui/material';
import Objects from '../../data/ObjectNames';
import NavigationItem from './NavigationItem';
import SceneObject from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';

function Navigation() {
  const { setSceneObjects, focus } = useEditorContext();

  const handleAdd = (object: typeof Objects[0]) => {
    const newObject: SceneObject = {
      id: crypto.randomUUID(), 
      geometryType: object.name,
      component: <object.component parentCallback={focus} />
    };
    setSceneObjects((old) => [...old, newObject])
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
