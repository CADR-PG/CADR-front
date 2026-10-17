import { useLoader } from '@react-three/fiber';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { Audio, TextureLoader } from 'three';
import cAudio from '../../../engine/components/Audio';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { useAudioListener } from '../../../hooks/useAudioListener';
import useDownloadFile from '../../../hooks/useDownloadFile';
import { normalizeUrl } from '../../../engine/components/helpers/material';
import useAudio from '../../../hooks/useAudio';

export default function AudioController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const audio = em.getComponent(cAudio, entity);
  const { focus, running } = useEditorContext();
  const listener = useAudioListener();
  const { data: audioFile } = useDownloadFile(audio?.source);
  const texture = useLoader(TextureLoader, '/speaker.png');

  useAudio({
    create: () => new Audio(listener),
    url: audioFile ? normalizeUrl(audioFile) : null,
    params: audio!,
    enabled: running && !!audio,
  });

  return !running ? (
    <sprite scale={0.5} onClick={() => focus(entity)}>
      <spriteMaterial depthWrite={false} map={texture} transparent />
    </sprite>
  ) : null;
}
