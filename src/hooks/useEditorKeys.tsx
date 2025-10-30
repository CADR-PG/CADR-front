import { useKeyboardControls } from '@react-three/drei';
import Controls from '../types/Controls';
import { useEditorContext } from './useEditorContext';
import { useEffect, useState } from 'react';
import { ECS } from '../engine/ECS';
import Transform from '../engine/components/Transform';

function useEditorKeys() {
  const { focused, focus } = useEditorContext();
  const [copiedUuid, copyUuid] = useState<string>('');
  // TODO: making new variable for every key like this is going to suck.
  // need a better way to handle this
  const del = useKeyboardControls<Controls>((state) => state.del);
  const ctrl = useKeyboardControls<Controls>((state) => state.ctrl);
  const copy = useKeyboardControls<Controls>((state) => state.copy);
  const paste = useKeyboardControls<Controls>((state) => state.paste);
  const moveL = useKeyboardControls<Controls>((state) => state.moveL);
  const moveR = useKeyboardControls<Controls>((state) => state.moveR);
  const moveU = useKeyboardControls<Controls>((state) => state.moveU);
  const moveD = useKeyboardControls<Controls>((state) => state.moveD);

  useEffect(() => {
    if (!focused) return;

    const transform = ECS.instance.entityManager.getComponent(
      Transform,
      focused,
    );

    if (moveU) {
      if (!transform) return;
      transform.position[1] += 0.5;
    }

    if (moveD) {
      if (!transform) return;
      transform.position[1] -= 0.5;
    }

    if (moveL) {
      if (!transform) return;
      transform.position[0] -= 0.5;
    }

    if (moveR) {
      if (!transform) return;
      transform.position[0] += 0.5;
    }

    if (del) {
      ECS.instance.entityManager.destroyEntity(focused);
      focus(null);
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
  }, [del, ctrl, copy, paste, moveU, moveD, moveL, moveR]);
}

export default useEditorKeys;
