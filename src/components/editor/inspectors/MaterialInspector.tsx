import { ChangeEvent } from 'react';
import Material from '../../../engine/components/Material';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import { SketchPicker } from 'react-color';

interface MaterialInspectorProps {
  entity: Entity;
  component: Material;
}

export default function MaterialInspector({
  entity,
  component,
}: MaterialInspectorProps) {
  const { name: _name, ...snap } = component;
  const materialWrite = ECS.instance.entityManager.getComponent(
    Material,
    entity,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (!materialWrite) return;

    const type = e.currentTarget.type;
    switch (type) {
      case 'text':
        materialWrite.data.parameters[key] = e.currentTarget.value;
        break;
      case 'number':
        materialWrite.data.parameters[key] = Number(e.currentTarget.value);
        break;
      case 'boolean':
        materialWrite.data.parameters[key] = !!e.currentTarget.value;
        break;
    }
  };

  const renderSwitch = (key: string) => {
    switch (key) {
      case 'color':
        <SketchPicker />;
        break;
      default:
        return (
          <input
            type={
              typeof component.data.parameters[key] === 'boolean'
                ? 'checkbox'
                : typeof component.data.parameters[key] === 'number'
                  ? 'number'
                  : ''
            }
            value={snap.data.parameters[key]}
            onChange={(e) => handleChange(e, key)}
          ></input>
        );
    }
  };

  return (
    <>
      {Object.keys(snap.data.parameters).map((key) => {
        return (
          <div className="inspector-panel" key={key}>
            <div className="inspector-field">{key}</div>
            <div className="inspector-input">{renderSwitch(key)}</div>
          </div>
        );
      })}
    </>
  );
}
