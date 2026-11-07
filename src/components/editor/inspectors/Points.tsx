import Geometry from '../../../engine/components/Geometry';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ECS } from '../../../engine/ECS';
import NumberField from '../../NumberField';
import { Button } from '@mui/material';
import { GeometryPoints, PointsProps } from '@/types/GeometryPointsData';
import {
  makePopPointsCommand,
  makePushPointsCommand,
  makeSetPointsCommand,
} from '@/engine/Command';

export default function Points({ entity, points }: PointsProps) {
  const geometryWrite = ECS.instance.entityManager.getComponent(
    Geometry,
    entity,
  ) as GeometryPoints;

  if (!geometryWrite) return;

  const handlePoints = (value: number | null, index: number, xy: number) => {
    const command = makeSetPointsCommand(value, geometryWrite.data, index, xy);
    ECS.instance.entityManager.pushCommand(command);
    // geometryWrite.data.points[index][xy] = Number(value);
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
          onClick={() => {
            if (geometryWrite.data.points.length > 2) {
              const command = makePopPointsCommand(geometryWrite.data);
              ECS.instance.entityManager.pushCommand(command);
            }
          }}
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
          onClick={() => {
            const command = makePushPointsCommand(geometryWrite.data);
            ECS.instance.entityManager.pushCommand(command);
          }}
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
