import { MenuItem } from '@mui/material';
import Lights from '../../data/LightNames';
import { useEditorContext } from '../../hooks/useEditorContext';
import NavigationItem from './NavigationItem';
import Light from '../../engine/components/Light';
import { ECS } from '../../engine/ECS';
import Name from '../../engine/components/Name';
import Transform from '../../engine/components/Transform';
import { makeCreateEntityCommand } from '@/engine/Command';

function LightNavigationItem() {
  const { focus, focused } = useEditorContext();

  const handleAdd = (light: string) => {
    const command = makeCreateEntityCommand(focused, focus, (entity) => {
      ECS.instance.entityManager.addComponent(
        new Light(new Lights[light]()),
        entity,
      );
      ECS.instance.entityManager.addComponent(new Name(light), entity);
      ECS.instance.entityManager.addComponent(new Transform(), entity);
    });
    ECS.instance.entityManager.pushCommand(command);
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
