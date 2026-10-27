import { useKeyboardControls } from '@react-three/drei';
import Controls from '../types/Controls';
import { useEditorContext } from './useEditorContext';
import { useEffect, useState } from 'react';
import { ECS } from '../engine/ECS';
import {
  makeDestroyEntityCommand,
  makePasteEntityCommand,
} from '@/engine/Command';
import { useClipboardStore } from '@/stores/clipboardStore';

function useEditorKeys() {
  const { focused, focus } = useEditorContext();
  const { clipboard, copy: copyAction } = useClipboardStore();
  // TODO: making new variable for every key like this is going to suck.
  // need a better way to handle this
  const del = useKeyboardControls<Controls>((state) => state.del);
  const ctrl = useKeyboardControls<Controls>((state) => state.ctrl);
  const copy = useKeyboardControls<Controls>((state) => state.copy);
  const paste = useKeyboardControls<Controls>((state) => state.paste);
  const z = useKeyboardControls<Controls>((state) => state.z);

  useEffect(() => {
    if (del && focused) {
      const command = makeDestroyEntityCommand(focused, focus);
      ECS.instance.entityManager.pushCommand(command);
    }

    if (ctrl) {
      if (z) {
        console.log('Undoing');
        ECS.instance.entityManager.popCommand();
      }

      if (copy && focused) {
        copyAction(focused);
      }

      if (paste) {
        const parent = focused ?? ECS.instance.entityManager.getScene().root;
        if (clipboard && parent) {
          const command = makePasteEntityCommand(clipboard, parent, focus);
          ECS.instance.entityManager.pushCommand(command);
        }
      }
    }
    // TODO: we absolutely shouldn't do this but I can't be bothered right now
    // with fixing this shit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del, ctrl, copy, paste, z]);
}

export default useEditorKeys;
