import { useEffect, useRef } from 'react';
import { Audio } from 'three';
import cAudio from '../engine/components/Audio';
import { AudioLoader } from 'three';
import { useEditorContext } from './useEditorContext';
import { Object3D } from 'three';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const audioLoader = new AudioLoader();

interface useAudioProps<T extends Audio<AudioNode>> {
  create: () => T;
  url: string | null;
  applyExtra?: (sound: T) => void;
  params: cAudio;
  parent?: Object3D | null;
  enabled: boolean;
}

export default function useAudio<T extends Audio<AudioNode>>({
  create,
  url,
  applyExtra,
  params,
  parent,
  enabled,
}: useAudioProps<T>) {
  const { running } = useEditorContext();
  const soundRef = useRef<Audio<AudioNode> | null>(null);

  useEffect(() => {
    if (!url || !enabled) return;

    let cancelled = false;
    const sound = create();
    soundRef.current = sound;
    parent?.add(sound);

    audioLoader.load(
      url,
      (buffer) => {
        if (cancelled) return;

        sound.setLoop(params.loop);
        sound.setLoopStart(params.loopStart);
        sound.setLoopEnd(params.loopEnd);
        sound.setVolume(params.volume);
        sound.setPlaybackRate(params.playbackRate);
        sound.duration = params.duration !== -1 ? params.duration : undefined;
        sound.offset = params.offset;
        applyExtra?.(sound);

        sound.setBuffer(buffer);
        if (params.autoplay) {
          sound.play();
          sound.setDetune(params.detune);
        } else {
          sound.setDetune(params.detune);
        }
      },
      undefined,
      (err) => console.error(`Audio load failed: ${params.source}`, err),
    );

    return () => {
      cancelled = true;
      if (sound.isPlaying) sound.stop();
      sound.disconnect();
      sound.removeFromParent();
      soundRef.current = null;
    };
  }, [
    running,
    parent,
    params?.autoplay,
    params?.duration,
    params?.loopEnd,
    params?.loopStart,
    params?.offset,
    params?.source,
    params?.detune,
    params?.loop,
    params?.playbackRate,
    params?.volume,
  ]);

  return soundRef;
}
