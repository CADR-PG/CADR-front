import { useLoader } from '@react-three/fiber';
import { ReactNode } from 'react';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { TextureLoader } from 'three';
import { Entity } from '../../../engine/Entity';

interface LightTemplateProps {
  entity: Entity;
  children: ReactNode;
}

export default function LightTemplate({
  entity,
  children,
}: LightTemplateProps) {
  const colorMap = useLoader(TextureLoader, '/public/lightbulb.png');
  const { focus, running } = useEditorContext();
  return (
    <group>
      {children}

      {!running && (
        <sprite scale={0.5} onClick={() => focus(entity)}>
          <spriteMaterial depthWrite={false} map={colorMap} transparent />
        </sprite>
      )}
    </group>
  );
}
