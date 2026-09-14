import Light, { LightData } from '../../../engine/components/Light';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import ColorPicker from './ColorPicker';
import LightType from './LightType';
import InspectorTemplate from './InspectorTemplate';

interface LightInspectorProps<T extends LightData> {
  entity: Entity;
  data: T;
}

export default function LightInspector<T extends LightData>({
  entity,
  data,
}: LightInspectorProps<T>) {
  const lightWrite = ECS.instance.entityManager.getComponent(Light, entity);

  if (!lightWrite) return null;

  return (
    <InspectorTemplate
      entity={entity}
      componentType={Light}
      skipKeys={[]}
      select={(c) => c.data as T}
      specialRender={(key) => {
        switch (key) {
          case 'type':
            return <LightType entity={entity} type={data.type} />;
          case 'color':
          case 'groundColor':
          case 'skyColor':
            return (
              lightWrite.data && (
                <ColorPicker
                  componentColor={data[key] as number}
                  data={lightWrite.data}
                  // NOTE(m1k53r): xd
                  field={key as keyof typeof lightWrite.data}
                />
              )
            );
        }
      }}
    />
  );
}
