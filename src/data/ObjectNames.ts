import TorusGeometryData from '../engine/components/geometries/TorusGeometryData';
import CapsuleGeometryData from '../engine/components/geometries/CapsuleGeometryData';
import CircleGeometryData from '../engine/components/geometries/CircleGeometryData';
import ConeGeometryData from '../engine/components/geometries/ConeGeometryData';
import CylinderGeometryData from '../engine/components/geometries/CylinderGeometryData';
import DodecahedronGeometryData from '../engine/components/geometries/DodecahedronGeometryData';
import ExtrudeGeometryData from '../engine/components/geometries/ExtrudeGeometryData';
import LatheGeometryData from '../engine/components/geometries/LatheGeometryData';
import OctahedronGeometryData from '../engine/components/geometries/OctahedronGeometryData';
import PlaneGeometryData from '../engine/components/geometries/PlaneGeometryData';
import SphereGeometryData from '../engine/components/geometries/SphereGeometryData';
import TetrahedronGeometryData from '../engine/components/geometries/TetrahedronGeometryData';
import GeometryItem from '../types/GeometryItem';
import BoxGeometryData from '../engine/components/geometries/BoxGeometryData';
const Objects: GeometryItem[] = [
  {
    name: 'Box',
    geometry: BoxGeometryData,
  },
  {
    name: 'Torus',
    geometry: TorusGeometryData,
  },

  {
    name: 'Capsule',
    geometry: CapsuleGeometryData,
  },

  {
    name: 'Circle',
    geometry: CircleGeometryData,
  },

  {
    name: 'Cone',
    geometry: ConeGeometryData,
  },

  {
    name: 'Cylinder',
    geometry: CylinderGeometryData,
  },

  {
    name: 'Dodecahedron',
    geometry: DodecahedronGeometryData,
  },

  {
    name: 'Extrude',
    geometry: ExtrudeGeometryData,
  },
  {
    name: 'Lathe',
    geometry: LatheGeometryData,
  },

  {
    name: 'Octahedron',
    geometry: OctahedronGeometryData,
  },

  {
    name: 'Plane',
    geometry: PlaneGeometryData,
  },

  {
    name: 'Sphere',
    geometry: SphereGeometryData,
  },

  {
    name: 'Tetrahedron',
    geometry: TetrahedronGeometryData,
  },
];

export default Objects;
