import Geometry, {
  GeometryData,
  Point,
} from '../../../engine/components/Geometry';
import { Entity } from '../../../engine/Entity';
import Points from './Points';
import Type from './Type';
import InspectorTemplate from './InspectorTemplate';

interface GeometryInspectorProps<T extends GeometryData> {
  entity: Entity;
  data: T;
}

export default function GeometryInspector<T extends GeometryData>({
  entity,
  data,
}: GeometryInspectorProps<T>) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={Geometry}
      skipKeys={[]}
      select={(c) => c.data as T}
      specialRender={(key) => {
        switch (key) {
          case 'type':
            return <Type entity={entity} type={data.type} />;
          case 'points':
            return (
              <Points
                entity={entity}
                points={'points' in data ? (data.points as Point[]) : []}
              />
            );
          default:
            return undefined;
        }
      }}
    />
  );
}
