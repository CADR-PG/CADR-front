import { ChangeEvent } from 'react';
import Geometry, {
  GeometryData,
  Point,
} from '../../../engine/components/Geometry';
import { Entity } from '../../../engine/Entity';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ECS } from '../../../engine/ECS';

interface GeometryPointsData extends GeometryData {
  points: Point[];
}

interface GeometryPoints extends Geometry {
  data: GeometryPointsData;
}

interface PointsProps {
  entity: Entity;
  points: Point[];
}

export default function Points({ entity, points }: PointsProps) {
  const geometryWrite = ECS.instance.entityManager.getComponent(
    Geometry,
    entity,
  ) as GeometryPoints;

  if (!geometryWrite) return;

  const handlePoints = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    xy: number,
  ) => {
    geometryWrite.data.points[index][xy] = Number(e.currentTarget.value);
  };

  return (
    <>
      {points.map((point, index) => {
        return (
          <div className="inspector-input-columns" key={index}>
            x:
            <input
              className="inspector-input-columns-column"
              type="number"
              value={point[0]}
              onChange={(e) => handlePoints(e, index, 0)}
            />
            y:
            <input
              className="inspector-input-columns-column"
              type="number"
              value={point[1]}
              onChange={(e) => handlePoints(e, index, 1)}
            />
          </div>
        );
      })}
      <div className="inspector-input-buttons">
        <button
          className="inspector-input-buttons-button"
          onClick={() => geometryWrite.data.points.push([0, 0])}
        >
          <AddIcon
            fontSize="small"
            className="inspector-input-buttons-button-icon"
          />
        </button>
        <button
          className="inspector-input-buttons-button"
          onClick={() =>
            geometryWrite.data.points.length > 2
              ? geometryWrite.data.points.pop()
              : null
          }
        >
          <CloseIcon
            fontSize="small"
            className="inspector-input-buttons-button-icon"
          />
        </button>
      </div>
    </>
  );
}
