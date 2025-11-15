import TorusController from '../components/editor/objects/TorusController';
import BoxController from '../components/editor/objects/BoxController';
import CapsuleController from '../components/editor/objects/CapsuleController';
import CircleController from '../components/editor/objects/CircleController';
import ConeController from '../components/editor/objects/ConeController';
import CylinderController from '../components/editor/objects/CylinderController';
import DodecahedronController from '../components/editor/objects/DodecahedronController';
import ExtrudeController from '../components/editor/objects/ExtrudeController';
import LatheController from '../components/editor/objects/LatheController';
import OctahedronController from '../components/editor/objects/OctahedronController';
import PlaneController from '../components/editor/objects/PlaneController';
import SphereController from '../components/editor/objects/SphereController';
import TetrahedronController from '../components/editor/objects/TetrahedronController';
import { SceneObject } from '../types/SceneObject';

const Objects: SceneObject[] = [
  {
    name: 'Torus',
    component: TorusController,
  },

  {
    name: 'Box',
    component: BoxController,
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
