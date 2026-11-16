import { Camera } from '../../../engine/components/Camera';
import InspectorTemplate from './InspectorTemplate';
import InspectorProps from '../../../types/InspectorProps';

export default function CameraInspector({ entity }: InspectorProps) {
  return <InspectorTemplate entity={entity} componentType={Camera} />;
}
