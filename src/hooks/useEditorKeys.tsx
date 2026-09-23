import { useKeyboardControls } from '@react-three/drei';
import Controls from '../types/Controls';
import { useEditorContext } from './useEditorContext';
import { useEffect, useState } from 'react';
import { ECS } from '../engine/ECS';
import { Camera } from '../engine/components/Camera';
import MainCamera from '../engine/components/MainCamera';

function useEditorKeys() {
  const { focused, focus } = useEditorContext();
  const [copiedUuid, copyUuid] = useState<string>('');
  // TODO: making new variable for every key like this is going to suck.
  // need a better way to handle this
  const del = useKeyboardControls<Controls>((state) => state.del);
  const ctrl = useKeyboardControls<Controls>((state) => state.ctrl);
  const copy = useKeyboardControls<Controls>((state) => state.copy);
  const paste = useKeyboardControls<Controls>((state) => state.paste);

  useEffect(() => {
    if (!focused) return;

    if (del) {
      const wasMainCamera = ECS.instance.entityManager.has(MainCamera, focused);
      ECS.instance.entityManager.destroyEntity(focused);
      focus(null);

      if (wasMainCamera) {
        // Play needs a main camera to control - if one still exists,
        // promote it instead of leaving the scene without one.
        const nextCamera = ECS.instance.entityManager
          .getEntities()
          .find((entity) =>
            ECS.instance.entityManager.getComponent(Camera, entity),
          );
        if (nextCamera) {
          ECS.instance.entityManager.addComponent(new MainCamera(), nextCamera);
        }
      }
    }

    if (ctrl) {
      if (copy) {
        copyUuid(focused);
      }

      if (paste && copiedUuid) {
        const entity = ECS.instance.clone(copiedUuid);
        focus(entity);
      }
    }
    // TODO: we absolutely shouldn't do this but I can't be bothered right now
    // with fixing this shit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del, ctrl, copy, paste]);
}

export default useEditorKeys;
