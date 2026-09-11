import { useThree } from '@react-three/fiber';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { AudioListener } from 'three';

interface AudioListenerProps {
  children: ReactNode;
}

const AudioListenerContext = createContext<AudioListener | null>(null);

export function AudioListenerProvider({ children }: AudioListenerProps) {
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

export function useAudioListener(): AudioListener {
  const listener = useContext(AudioListenerContext);
  if (!listener)
    throw new Error(
      'useAudioListener has to be inside of AudioListenerProvider',
    );
  return listener;
}
