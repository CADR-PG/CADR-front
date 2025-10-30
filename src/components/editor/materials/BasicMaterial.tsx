import Material, {
  BasicMaterialData,
} from '../../../engine/components/Material';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function BasicMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let basicMaterialData;

  if (materialData?.element === 'basic') {
    basicMaterialData = materialData.data as BasicMaterialData;
  }

  return (
    basicMaterialData && <meshBasicMaterial color={basicMaterialData.color} />
  );
}
