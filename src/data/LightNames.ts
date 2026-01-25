import AmbienLightData from '../engine/components/lights/AmbientLightData';
import DirectionalLightData from '../engine/components/lights/DirectionalLightData';
import HemisphereLightData from '../engine/components/lights/HemisphereLightData';
import PointLightData from '../engine/components/lights/PointLightData';
import RectAreaLightData from '../engine/components/lights/RectAreaLightData';
import SpotLightData from '../engine/components/lights/SpotLightData';
import LightItems from '../types/LightItems';

const Lights: LightItems = {
  directional: DirectionalLightData,
  point: PointLightData,
  rectarea: RectAreaLightData,
  hemisphere: HemisphereLightData,
  ambient: AmbienLightData,
  spotlight: SpotLightData,
};

export default Lights;
