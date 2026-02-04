import BasicMaterialData from '../engine/components/materials/BasicMaterialData';
import DepthMaterialData from '../engine/components/materials/DepthMaterialData';
import LambertMaterialData from '../engine/components/materials/LambertMaterialData';
import MatcapMaterialData from '../engine/components/materials/MatcapMaterialData';
import NormalMaterialData from '../engine/components/materials/NormalMaterialData';
import PhongMaterialData from '../engine/components/materials/PhongMaterialData';
import PhysicalMaterialData from '../engine/components/materials/PhysicalMaterialData';
import StandardMaterialData from '../engine/components/materials/StandardMaterialData';
import ToonMaterialData from '../engine/components/materials/ToonMaterialData';
import MaterialItems from '../types/MaterialItem';

const Materials: MaterialItems = {
  basic: BasicMaterialData,
  depth: DepthMaterialData,
  lambert: LambertMaterialData,
  matcap: MatcapMaterialData,
  normal: NormalMaterialData,
  phong: PhongMaterialData,
  physical: PhysicalMaterialData,
  standard: StandardMaterialData,
  toon: ToonMaterialData,
};

export default Materials;
