import { createContext, useContext } from 'react';
import { AudioListener } from 'three';

export const AudioListenerContext = createContext<AudioListener | null>(null);

export function useAudioListener(): AudioListener {
  const listener = useContext(AudioListenerContext);
  if (!listener)
    throw new Error(
      'useAudioListener has to be inside of AudioListenerProvider',
    );
  return listener;
}
