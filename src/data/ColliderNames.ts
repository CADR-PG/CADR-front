import Ball from '../engine/components/colliders/Ball';
import Cuboid from '../engine/components/colliders/Cuboid';
import ColliderItem from '../types/ColliderItem';
import Cone from '../engine/components/colliders/Cone';
import Capsule from '../engine/components/colliders/Capsule';
import Cylinder from '../engine/components/colliders/Cylinder';
import RoundCone from '../engine/components/colliders/RoundCone';
import RoundCuboid from '../engine/components/colliders/RoundCuboid';
import RoundCylinder from '../engine/components/colliders/RoundCylinder';

const Colliders: ColliderItem = {
  ballCollider: Ball,
  capsuleCollider: Capsule,
  coneCollider: Cone,
  cuboidCollider: Cuboid,
  cylinderCollider: Cylinder,
  roundConeCollider: RoundCone,
  roundCuboidCollider: RoundCuboid,
  roundCylinderCollider: RoundCylinder,
};

export default Colliders;
