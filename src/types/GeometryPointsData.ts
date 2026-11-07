import Geometry, { GeometryData, Point } from '@/engine/components/Geometry';
import { Entity } from '@/engine/Entity';

export interface GeometryPointsData extends GeometryData {
  points: Point[];
}

export interface GeometryPoints extends Geometry {
  data: GeometryPointsData;
}

export interface PointsProps {
  entity: Entity;
  points: Point[];
}
