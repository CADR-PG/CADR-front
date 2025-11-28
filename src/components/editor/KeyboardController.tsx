import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { ReactNode, useMemo } from 'react';
import Controls from '../../types/Controls';

interface KeyboardControllerProps {
  children: ReactNode;
}

function KeyboardController({ children }: KeyboardControllerProps) {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.del, keys: ['Delete'] },
      { name: Controls.ctrl, keys: ['ControlLeft', 'ControlRight'] },
      { name: Controls.copy, keys: ['c', 'C'] },
      { name: Controls.paste, keys: ['v', 'V'] },
      { name: Controls.moveL, keys: ['ArrowLeft'] },
      { name: Controls.moveR, keys: ['ArrowRight'] },
      { name: Controls.moveU, keys: ['ArrowUp'] },
      { name: Controls.moveD, keys: ['ArrowDown'] },
    ],
    [],
  );

  return <KeyboardControls map={map}>{children}</KeyboardControls>;
}

export default KeyboardController;
