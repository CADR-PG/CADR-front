import { useThree } from '@react-three/fiber';
import { ReactNode, useEffect, useMemo } from 'react';
import { AudioListener } from 'three';
import { AudioListenerContext } from '../../hooks/useAudioListener';

interface AudioListenerProps {
  children: ReactNode;
}

export default function AudioListenerProvider({
  children,
}: AudioListenerProps) {
  const { camera } = useThree();
  const listener = useMemo(() => new AudioListener(), []);

  useEffect(() => {
    camera.add(listener);
    return () => {
      camera.remove(listener);
    };
  }, [camera, listener]);

  return (
    <AudioListenerContext.Provider value={listener}>
      {children}
    </AudioListenerContext.Provider>
  );
}
