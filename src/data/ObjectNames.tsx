import TorusController from '../components/editor/geometries/TorusController';
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
import { SceneObject } from '../types/SceneObject';

const Objects: SceneObject[] = [
  {
    name: 'Torus',
    component: TorusController,
  },

  {
    name: 'Capsule',
    component: CapsuleController,
  },

  {
    name: 'Circle',
    component: CircleController,
  },

  {
    name: 'Cone',
    component: ConeController,
  },

  {
    name: 'Cylinder',
    component: CylinderController,
  },

  {
    name: 'Dodecahedron',
    component: DodecahedronController,
  },

  {
    name: 'Extrude',
    component: ExtrudeController,
  },
  {
    name: 'Lathe',
    component: LatheController,
  },

  {
    name: 'Octahedron',
    component: OctahedronController,
  },

  {
    name: 'Plane',
    component: PlaneController,
  },

  {
    name: 'Sphere',
    component: SphereController,
  },

  {
    name: 'Tetrahedron',
    component: TetrahedronController,
  },
];

export default Objects;
