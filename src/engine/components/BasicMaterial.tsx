import { BasicMaterialData } from '../../types/Material';

export default function BasicMaterial(data: BasicMaterialData) {
  return <meshBasicMaterial color={data.color} />;
}
