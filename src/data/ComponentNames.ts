import { JSX } from 'react';

import BoxController from '../components/editor/geometries/BoxController';
import CapsuleController from '../components/editor/geometries/CapsuleController';
import CircleController from '../components/editor/geometries/CircleController';
import ConeController from '../components/editor/geometries/ConeController';
import CylinderController from '../components/editor/geometries/CylinderController';
import DodecahedronController from '../components/editor/geometries/DodecahedronController';
import ExtrudeController from '../components/editor/geometries/ExtrudeController';
import LatheController from '../components/editor/geometries/LatheController';
import OctahedronController from '../components/editor/geometries/OctahedronController';
import PlaneController from '../components/editor/geometries/PlaneController';
import SphereController from '../components/editor/geometries/SphereController';
import TetrahedronController from '../components/editor/geometries/TetrahedronController';
import TorusController from '../components/editor/geometries/TorusController';

import BasicMaterial from '../components/editor/materials/BasicMaterial';
import DepthMaterial from '../components/editor/materials/DepthMaterial';
import LambertMaterial from '../components/editor/materials/LambertMaterial';
import MatcapMaterial from '../components/editor/materials/MatcapMaterial';
import NormalMaterial from '../components/editor/materials/NormalMaterial';
import PhongMaterial from '../components/editor/materials/PhongMaterial';
import PhysicalMaterial from '../components/editor/materials/PhysicalMaterial';
import StandardMaterial from '../components/editor/materials/StandardMaterial';
import ToonMaterial from '../components/editor/materials/ToonMaterial';

interface ComponentToElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: (...args: any[]) => JSX.Element | undefined;
}

const ComponentNames: ComponentToElement = {
  box: BoxController,
  capsule: CapsuleController,
  circle: CircleController,
  cone: ConeController,
  cylinder: CylinderController,
  dodecahedron: DodecahedronController,
  extrude: ExtrudeController,
  lathe: LatheController,
  octahedron: OctahedronController,
  plane: PlaneController,
  sphere: SphereController,
  tetrahedron: TetrahedronController,
  torus: TorusController,

  basic: BasicMaterial,
  depth: DepthMaterial,
  lambert: LambertMaterial,
  matcap: MatcapMaterial,
  normal: NormalMaterial,
  phong: PhongMaterial,
  physical: PhysicalMaterial,
  standard: StandardMaterial,
  toon: ToonMaterial,
};

export default ComponentNames;
