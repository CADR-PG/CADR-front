import { MenuItem } from '@mui/material';
import { useEditorContext } from '../../hooks/useEditorContext';
import NavigationItem from './NavigationItem';
import ParticleEmitter from '../../engine/components/ParticleEmitter';
import { ECS } from '../../engine/ECS';
import Name from '../../engine/components/Name';
import Transform from '../../engine/components/Transform';
import { makeCreateEntityCommand } from '@/engine/Command';

function ParticleNavigationItem() {
  const { focus, focused } = useEditorContext();

  const handleAdd = () => {
    const command = makeCreateEntityCommand(focused, focus, (entity) => {
      ECS.instance.entityManager.addComponent(new ParticleEmitter(), entity);
      ECS.instance.entityManager.addComponent(
        new Name('Particle Emitter'),
        entity,
      );
      ECS.instance.entityManager.addComponent(new Transform(), entity);
    });
    ECS.instance.entityManager.pushCommand(command);
  };

  return (
    <NavigationItem label="Particles">
      <MenuItem onClick={handleAdd}>Emitter</MenuItem>
    </NavigationItem>
  );
}

export default ParticleNavigationItem;
