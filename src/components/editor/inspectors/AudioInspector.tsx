import { Entity } from '../../../engine/Entity';
import cAudio from '../../../engine/components/Audio';
import useEntityManager from '../../../hooks/useEntityManager';
import AudioDropArea from './AudioDropArea';
import { ComponentType } from '../../../engine/Component';
import GenericSelect from './GenericSelect';
import { cPositionalAudio } from '../../../engine/components/PositionalAudio';
import InspectorTemplate from './InspectorTemplate';

function isPositional<T extends cAudio>(a: T): a is T & cPositionalAudio {
  return 'distanceModel' in a;
}

interface AudioInspectorProps<T extends cAudio> {
  entity: Entity;
  componentType: ComponentType<T>;
}

export default function AudioInspector<T extends cAudio>({
  entity,
  componentType,
}: AudioInspectorProps<T>) {
  const em = useEntityManager();
  const audio = em.getComponent(componentType, entity);

  if (!audio) return null;

  return (
    <InspectorTemplate
      entity={entity}
      componentType={componentType}
      specialRender={(key) => {
        switch (key) {
          case 'source':
            return (
              <AudioDropArea entity={entity} componentType={componentType} />
            );
          case 'distanceModel':
            console.log(
              audio?.constructor?.name,
              audio instanceof cAudio,
              cPositionalAudio.prototype.isPrototypeOf(audio),
              Object.getPrototypeOf(audio) === cPositionalAudio.prototype,
            );
            if (!isPositional(audio)) return null;
            return (
              <GenericSelect
                entity={entity}
                componentType={
                  componentType as ComponentType<T & cPositionalAudio>
                }
                componentKey={key}
                value={audio.distanceModel}
                options={{
                  linear: 'linear',
                  inverse: 'inverse',
                  exponential: 'exponential',
                }}
              />
            );
          default:
            return undefined;
        }
      }}
    />
  );
}
