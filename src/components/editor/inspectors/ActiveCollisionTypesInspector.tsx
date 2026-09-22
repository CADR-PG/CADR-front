import GenericSelect from './GenericSelect';
import { Component, ComponentType } from '../../../engine/Component';
import InspectorProps from '../../../types/InspectorProps';

interface ActiveCollisionTypesInspectorProps<T extends Component> {
  componentType: ComponentType<T>;
}
export default function ActiveCollisionTypesInspector<T extends Component>({
  entity,
  componentType,
}: InspectorProps & ActiveCollisionTypesInspectorProps<T>) {
  return (
    <GenericSelect
      entity={entity}
      componentType={componentType}
      componentKey={'activeCollisionTypes' as keyof T}
      options={{
        All: 60943,
        Default: 15,
        'Dynamic-dynamic': 1,
        'Dynamic-fixed': 2,
        'Dynamic-kinematic': 12,
        'Fixed-fixed': 32,
        'Kinematic-fixed': 8704,
        'Kinematic-kinematic': 52224,
      }}
    />
  );
}
