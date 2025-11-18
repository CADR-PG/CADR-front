import { ChangeEvent } from 'react';
import Material from '../../../engine/components/Material';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import ColorPicker from './ColorPicker';
import EnvMapRotation from './EnvMapRotation';
import Wireframe from './Wireframe';

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

  if (!materialWrite) return;

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
      case 'checkbox':
        materialWrite.data.parameters[key] = e.currentTarget.checked;
        break;
    }
  };

  const renderSwitch = (key: string) => {
    switch (key) {
      case 'color':
        return (
          <ColorPicker
            entity={entity}
            componentColor={component.data.parameters.color}
          />
        );
      case 'envMapRotation':
        return (
          <EnvMapRotation
            entity={entity}
            envMapRotation={component.data.parameters.envMapRotation}
          />
        );
      case 'wireframeLinecap':
      case 'wireframeLinejoin':
        return (
          <Wireframe
            entity={entity}
            wireframe={component.data.parameters[key]}
            wireframeKey={key}
          />
        );
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
            onClick={(e) => handleChange(e, key)}
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
