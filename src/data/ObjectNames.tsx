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

const Objects = [
  {
    id: 1,
    name: 'Torus',
    component: TorusController,
  },

  {
    id: 2,
    name: 'Box',
    component: BoxController,
  },

  {
    id: 3,
    name: 'Capsule',
    component: CapsuleController,
  },

  {
    id: 4,
    name: 'Circle',
    component: CircleController,
  },

  {
    id: 4,
    name: 'Cone',
    component: ConeController,
  },

  {
    id: 6,
    name: 'Cylinder',
    component: CylinderController,
  },

  {
    id: 7,
    name: 'Dodecahedron',
    component: DodecahedronController,
  },

  {
    id: 8,
    name: 'Extrude',
    component: ExtrudeController,
  },
  {
    id: 9,
    name: 'Lathe',
    component: LatheController,
  },

  {
    id: 10,
    name: 'Octahedron',
    component: OctahedronController,
  },

  {
    id: 11,
    name: 'Plane',
    component: PlaneController,
  },

  {
    id: 12,
    name: 'Sphere',
    component: SphereController,
  },

  {
    id: 13,
    name: 'Tetrahedron',
    component: TetrahedronController,
  },
];

export default Objects;
