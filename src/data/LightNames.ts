import DirectionalLightData from '../engine/components/lights/DirectionalLightData';
import PointLightData from '../engine/components/lights/PointLightData';
import LightItems from '../types/LightItems';

const Lights: LightItems = {
  directional: DirectionalLightData,
  point: PointLightData,
};

export default Lights;
