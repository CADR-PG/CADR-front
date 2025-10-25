import Material, {
  BasicMaterialData,
} from '../../../engine/components/Material';
import { ECS } from '../../../engine/ECS';
import ControllerProps from '../../../types/ControllerProps';

export default function BasicMaterial({ entity }: ControllerProps) {
  const materialData = ECS.instance.getComponent(Material, entity);
  let basicMaterialData;

  if (materialData?.element === 'basic') {
    basicMaterialData = materialData.data as BasicMaterialData;
  }

  return (
    basicMaterialData && <meshBasicMaterial color={basicMaterialData.color} />
  );
}
