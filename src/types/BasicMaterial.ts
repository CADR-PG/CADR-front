import * as THREE from 'three';
import Material from './Material';

export default interface BasicMaterial extends Material {
  color: THREE.Color;
}
