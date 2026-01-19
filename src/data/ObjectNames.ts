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
import GeometryItems from '../types/GeometryItem';
import BoxGeometryData from '../engine/components/geometries/BoxGeometryData';

const Objects: GeometryItems = {
  box: BoxGeometryData,
  torus: TorusGeometryData,
  capsule: CapsuleGeometryData,
  circle: CircleGeometryData,
  cone: ConeGeometryData,
  cylinder: CylinderGeometryData,
  dodecahedron: DodecahedronGeometryData,
  extrude: ExtrudeGeometryData,
  lathe: LatheGeometryData,
  octahedron: OctahedronGeometryData,
  plane: PlaneGeometryData,
  sphere: SphereGeometryData,
  tetrahedron: TetrahedronGeometryData,
};

export default Objects;
