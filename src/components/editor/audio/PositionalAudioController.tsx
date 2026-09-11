import { useLoader } from '@react-three/fiber';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { Object3D, PositionalAudio, TextureLoader } from 'three';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { useAudioListener } from '../../../hooks/useAudioListener';
import useDownloadFile from '../../../hooks/useDownloadFile';
import { normalizeUrl } from '../../../engine/components/helpers/material';
import useAudio from '../../../hooks/useAudio';
import { cPositionalAudio } from '../../../engine/components/PositionalAudio';

interface PositionalAudioControllerProps {
  parent: Object3D;
}

export default function PositionalAudioController({
  entity,
  parent,
}: ControllerProps & PositionalAudioControllerProps) {
  const em = useEntityManager();
  const paudio = em.getComponent(cPositionalAudio, entity);
  const { focus, running } = useEditorContext();
  const listener = useAudioListener();
  const { data: audioFile } = useDownloadFile(paudio?.source);
  const texture = useLoader(TextureLoader, '/speaker.png');

  useAudio({
    create: () => new PositionalAudio(listener),
    url: audioFile ? normalizeUrl(audioFile) : null,
    params: paudio!,
    enabled: running && !!paudio,
    applyExtra: (s) => {
      if (!paudio) return;
      s.setDirectionalCone(
        paudio.coneInnerAngle,
        paudio.coneOuterAngle,
        paudio.coneOuterGain,
      );
      s.setDistanceModel(paudio.distanceModel);
      s.setMaxDistance(paudio.maxDistance);
      s.setRefDistance(paudio.refDistance);
      s.setRolloffFactor(paudio.rolloffFactor);
    },
    parent: parent,
  });

  return !running ? (
    <sprite scale={0.5} onClick={() => focus(entity)}>
      <spriteMaterial depthWrite={false} map={texture} transparent />
    </sprite>
  ) : null;
}
