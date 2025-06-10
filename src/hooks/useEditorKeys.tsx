import { useKeyboardControls } from '@react-three/drei';
import Controls from '../types/Controls';
import { useEditorContext } from './useEditorContext';
import { useEffect, useState } from 'react';
import { SceneObject } from '../types/SceneObject';
import GenericPrimitive from '../components/PrimitiveController';

function useEditorKeys() {
  const { sceneObjects, setSceneObjects, focused, focus } = useEditorContext();
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
      const copyObjects = { ...sceneObjects };
      delete copyObjects[focused];
      setSceneObjects(copyObjects);
      focus(null);
    }

    if (ctrl) {
      if (copy) {
        copyUuid(focused);
      }

      if (paste && copiedUuid) {
        const uuid = crypto.randomUUID();
        const object = sceneObjects[copiedUuid];
        const c = object.ref?.clone();
        const sceneObject: SceneObject = {
          name: object.name,
          component: () => <GenericPrimitive objectUuid={uuid} object={c!} />,
        };

        setSceneObjects({ ...sceneObjects, [uuid]: sceneObject });
        focus(uuid);
      }
    }
    // TODO: we absolutely shouldn't do this but I can't be bothered right now
    // with fixing this shit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del, ctrl, copy, paste]);
}

export default useEditorKeys;
