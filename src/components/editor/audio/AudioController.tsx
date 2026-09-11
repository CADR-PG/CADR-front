import { useLoader, useThree } from '@react-three/fiber';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { useEffect, useRef } from 'react';
import { Audio, AudioLoader, TextureLoader } from 'three';
import cAudio from '../../../engine/components/Audio';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { useAudioListener } from '../../../hooks/useAudioListener';
import useDownloadFile from '../../../hooks/useDownloadFile';
import { normalizeUrl } from '../../../engine/components/helpers/material';

const audioLoader = new AudioLoader();

export default function AudioController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const audio = em.getComponent(cAudio, entity);
  const { camera } = useThree();
  const { focus, running } = useEditorContext();
  const listener = useAudioListener();
  const soundRef = useRef<Audio | null>(null);
  const { data: audioFile } = useDownloadFile(audio?.source);
  const texture = useLoader(TextureLoader, '/speaker.png');

  useEffect(() => {
    if (!audio || !audio.source || !audioFile || !running) return;
    if (listener.parent !== camera) camera.add(listener);

    let cancelled = false;
    const sound = new Audio(listener);
    soundRef.current = sound;

    audioLoader.load(
      normalizeUrl(audioFile),
      (buffer) => {
        if (cancelled) return;

        sound.setLoop(audio.loop);
        sound.setLoopStart(audio.loopStart);
        sound.setLoopEnd(audio.loopEnd);
        sound.setVolume(audio.volume);
        sound.setPlaybackRate(audio.playbackRate);
        sound.duration = audio.duration !== -1 ? audio.duration : undefined;
        sound.offset = audio.offset;

        sound.setBuffer(buffer);
        if (audio.autoplay) {
          sound.play();
          sound.setDetune(audio.detune);
        } else {
          sound.setDetune(audio.detune);
        }
      },
      undefined,
      (err) => console.error(`Audio load failed: ${audio.source}`, err),
    );

    return () => {
      cancelled = true;
      if (sound.isPlaying) sound.stop();
      sound.disconnect();
      soundRef.current = null;
    };
  }, [
    listener,
    camera,
    running,
    audio?.autoplay,
    audio?.duration,
    audio?.loopEnd,
    audio?.loopStart,
    audio?.offset,
    audio?.source,
    audio?.detune,
    audio?.loop,
    audio?.playbackRate,
    audio?.volume,
  ]);

  return !running ? (
    <sprite scale={0.5} onClick={() => focus(entity)}>
      <spriteMaterial depthWrite={false} map={texture} transparent />
    </sprite>
  ) : null;
}
