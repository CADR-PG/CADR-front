import { MenuItem } from '@mui/material';
import Lights from '../../data/LightNames';
import { useEditorContext } from '../../hooks/useEditorContext';
import NavigationItem from './NavigationItem';
import Light from '../../engine/components/Light';
import { ECS } from '../../engine/ECS';
import Name from '../../engine/components/Name';

function LightNavigationItem() {
  const { focus } = useEditorContext();

  const handleAdd = (light: string) => {
    const entity = ECS.instance.entityManager.createEntity();

    ECS.instance.entityManager.addComponent(
      new Light(new Lights[light]()),
      entity,
    );
    ECS.instance.entityManager.addComponent(new Name(light), entity);

    focus(entity);
  };

  return (
    <NavigationItem label="Lights">
      {Object.keys(Lights).map((light) => (
        <MenuItem key={light} onClick={() => handleAdd(light)}>
          {light}
        </MenuItem>
      ))}
    </NavigationItem>
  );
}

export default LightNavigationItem;
