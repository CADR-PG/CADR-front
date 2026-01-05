import { ChangeEvent } from 'react';
import Geometry, {
  GeometryData,
  Point,
} from '../../../engine/components/Geometry';
import { Entity } from '../../../engine/Entity';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ECS } from '../../../engine/ECS';
import NumberField from '../../NumberField';
import { Button } from '@mui/material';

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

  const handlePoints = (value: number | null, index: number, xy: number) => {
    geometryWrite.data.points[index][xy] = Number(value);
  };

  return (
    <div className="inspector-input-points">
      {points.map((point, index) => {
        return (
          <div className="inspector-input-columns" key={index}>
            <NumberField
              size="small"
              className="inspector-input-columns-column"
              value={point[0]}
              onValueChange={(value) => handlePoints(value, index, 0)}
              label="x"
            />
            <NumberField
              size="small"
              className="inspector-input-columns-column"
              value={point[1]}
              onValueChange={(value) => handlePoints(value, index, 1)}
              label="y"
            />
          </div>
        );
      })}
      <div className="inspector-input-buttons">
        <Button
          fullWidth
          size="small"
          onClick={() =>
            geometryWrite.data.points.length > 2
              ? geometryWrite.data.points.pop()
              : null
          }
          variant="contained"
        >
          <CloseIcon
            fontSize="small"
            className="inspector-input-buttons-button-icon"
          />
        </Button>
        <Button
          fullWidth
          size="small"
          onClick={() => geometryWrite.data.points.push([0, 0])}
          variant="contained"
        >
          <AddIcon
            fontSize="small"
            className="inspector-input-buttons-button-icon"
          />
        </Button>
      </div>
    </div>
  );
}
