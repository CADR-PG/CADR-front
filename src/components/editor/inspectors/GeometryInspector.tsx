import { ChangeEvent } from 'react';
import Geometry, { GeometryData } from '../../../engine/components/Geometry';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import Objects from '../../../data/ObjectNames';
import LatheGeometryData from '../../../engine/components/geometries/LatheGeometryData';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface GeometryInspectorProps {
  entity: Entity;
  data: GeometryData;
}

export default function GeometryInspector({
  entity,
  data,
}: GeometryInspectorProps) {
  const geometryData = ECS.instance.entityManager.getComponent(
    Geometry,
    entity,
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof GeometryData,
  ) => {
    if (!geometryData) return;

    const type = e.currentTarget.type;

    // TODO: ehhh.....
    switch (type) {
      case 'text':
        geometryData.data[key] = e.currentTarget.value;
        break;
      case 'number':
        geometryData.data[key] = Number(e.currentTarget.value);
        break;
      case 'boolean':
        geometryData.data[key] = !!e.currentTarget.value;
        break;
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!geometryData) return;

    const name = e.currentTarget.value;

    ECS.instance.entityManager.removeComponent(Geometry, entity);
    ECS.instance.entityManager.addComponent(
      new Geometry(new Objects[name]()),
      entity,
    );
  };

  const handlePoints = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    xy: number,
  ) => {
    if (!geometryData) return;

    geometryData.data.points[index][xy] = e.currentTarget.value;
  };

  const renderSwitch = (key: keyof GeometryData) => {
    if (!geometryData) return;

    switch (key) {
      case 'type':
        return (
          <select
            onChange={handleSelect}
            defaultValue={geometryData?.data.type}
          >
            {Object.keys(Objects).map((object) => {
              return (
                <option key={object} value={object}>
                  {object}
                </option>
              );
            })}
          </select>
        );
      case 'points':
        return (
          <>
            {(data as LatheGeometryData).points.map((point, index) => {
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
                onClick={() => geometryData.data.points.push([0, 0])}
              >
                <AddIcon
                  fontSize="small"
                  className="inspector-input-buttons-button-icon"
                />
              </button>
              <button
                className="inspector-input-buttons-button"
                onClick={() =>
                  geometryData.data.points.length > 2
                    ? geometryData.data.points.pop()
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
      default:
        return (
          <input
            value={data[key as keyof GeometryData]}
            type={
              typeof data[key as keyof GeometryData] === 'boolean'
                ? 'checkbox'
                : typeof data[key as keyof GeometryData] === 'number'
                  ? 'number'
                  : ''
            }
            onChange={(e) => handleChange(e, key)}
          />
        );
    }
  };

  return (
    <>
      {Object.keys(data).map((key) => {
        return (
          <div className="inspector-panel" key={key}>
            <div className="inspector-field">{key}</div>
            <div className="inspector-input">
              {renderSwitch(key as keyof GeometryData)}
            </div>
          </div>
        );
      })}
    </>
  );
}
