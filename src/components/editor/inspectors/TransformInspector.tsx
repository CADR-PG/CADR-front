import { ChangeEvent } from 'react';
import Transform, { Vec3 } from '../../../engine/components/Transform';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';

interface TransformInspectorProps {
  entity: Entity;
  component: Transform;
}

export default function TransformInspector({
  entity,
  component,
}: TransformInspectorProps) {
  const { name: _name, ...snap } = component;
  const transformWrite = ECS.instance.entityManager.getComponent(
    Transform,
    entity,
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: string,
    position: number,
  ) => {
    if (!transformWrite) return;

    transformWrite[key][position] = e.currentTarget.value;
  };

  return (
    <>
      {Object.keys(snap).map((key) => {
        return (
          <div className="inspector-panel" key={key}>
            <div className="inspector-field">{key}</div>
            <div className="inspector-input">
              <div className="inspector-input-columns">
                x:
                <input
                  className="inspector-input-columns-column"
                  type="number"
                  value={(snap[key] as Vec3)[0]}
                  onChange={(e) => handleChange(e, key, 0)}
                />
                y:
                <input
                  className="inspector-input-columns-column"
                  type="number"
                  value={(snap[key] as Vec3)[1]}
                  onChange={(e) => handleChange(e, key, 1)}
                />
                z:
                <input
                  className="inspector-input-columns-column"
                  type="number"
                  value={(snap[key] as Vec3)[2]}
                  onChange={(e) => handleChange(e, key, 2)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
