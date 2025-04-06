import TorusController from '../Objects/TorusController';
import BoxController from '../Objects/BoxController';
import CapsuleController from '../Objects/CapsuleController';
import CircleController from '../Objects/CircleController';
import ConeController from '../Objects/ConeController';
import CylinderController from '../Objects/CylinderController';
import DodecahedronController from '../Objects/DodecahedronController';
import ExtrudeController from '../Objects/ExtrudeController';
import LatheController from '../Objects/LatheController';
import OctahedronController from '../Objects/OctahedronController';
import PlaneController from '../Objects/PlaneController';
import SphereController from '../Objects/SphereController';
import TetrahedronController from '../Objects/TetrahedronController';

const Objects = [
    {
        id: 1,
        name: "Torus",
        component: TorusController
    },
    {
        id: 2,
        name: "Box",
        component: BoxController
    },
    {
        id: 3,
        name: "Capsule",
        component: CapsuleController
    },
    {
        id: 4,
        name: "Circle",
        component: CircleController
    },
    {
        id: 4,
        name: "Cone",
        component: ConeController
    },
    {
        id: 6,
        name: "Cylinder",
        component: CylinderController
    },
    {
        id: 7,
        name: "Dodecahedron",
        component: DodecahedronController
    },
    {
        id: 8,
        name: "Extrude",
        component: ExtrudeController
    },
    {
        id: 9,
        name: "Lathe",
        component: LatheController
    },
    {
        id: 10,
        name: "Octahedron",
        component: OctahedronController
    },
    {
        id: 11,
        name: "Plane",
        component: PlaneController
    },
    {
        id: 12,
        name: "Sphere",
        component: SphereController
    },
    {
        id: 13,
        name: "Tetrahedron",
        component: TetrahedronController
    }
];

export default Objects;