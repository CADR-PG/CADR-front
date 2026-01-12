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
import CameraController from '../components/editor/CameraController';

interface ComponentToElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: (...args: any[]) => JSX.Element | undefined | null;
}

const ComponentNames: ComponentToElement = {
  camera: CameraController,
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
};

export default ComponentNames;
