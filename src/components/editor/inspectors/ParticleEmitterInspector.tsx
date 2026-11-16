import { Entity } from '../../../engine/Entity';
import ParticleEmitter from '../../../engine/components/ParticleEmitter';
import InspectorTemplate from './InspectorTemplate';
import ColorPicker from './ColorPicker';
import GenericSelect from './GenericSelect';
import { PARTICLE_SHAPES } from '../../../hooks/useParticleEmitter';

const shapeOptions = Object.fromEntries(
  PARTICLE_SHAPES.map((shape) => [shape, shape]),
);

interface ParticleEmitterInspectorProps {
  entity: Entity;
}

export default function ParticleEmitterInspector({
  entity,
}: ParticleEmitterInspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={ParticleEmitter}
      specialRender={(key) => {
        switch (key) {
          case 'colorStart':
          case 'colorEnd':
            return (
              <ColorPicker
                entity={entity}
                component={ParticleEmitter}
                field={key}
                select={(c) => c}
              />
            );
          case 'shape':
            return (
              <GenericSelect
                entity={entity}
                componentType={ParticleEmitter}
                componentKey={key}
                options={shapeOptions}
              />
            );
          default:
            return undefined;
        }
      }}
    />
  );
}
