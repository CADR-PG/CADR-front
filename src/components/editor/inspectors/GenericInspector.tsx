import { ChangeEvent } from 'react';
import { Component } from '../../../engine/Component';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';

interface GenericInspectorProps {
  entity: Entity;
  component: Component;
}

export default function GenericInspector({
  entity,
  component,
}: GenericInspectorProps) {
  if (Object.keys(component).length === 0) return;

  const { name: name, element: _element, ...snap } = component;
  const writeComponent = ECS.instance.entityManager.getComponent(
    ECS.instance.entityManager.mapNameToClass[name],
    entity,
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof Component,
  ) => {
    if (!writeComponent) return;

    writeComponent[key] = e.target.value;
  };

  return (
    <>
      {Object.keys(snap).map((key) => {
        return (
          <div className="inspector-panel" key={key}>
            <div className="inspector-field">{key}</div>
            <div className="inspector-input">
              <input
                value={component[key as keyof Component]}
                type={
                  typeof component[key as keyof Component] === 'boolean'
                    ? 'checkbox'
                    : ''
                }
                onChange={(e) => handleChange(e, key as keyof Component)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
