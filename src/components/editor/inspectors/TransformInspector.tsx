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
    // NOTE(m1k53r): I'm not sure if using keyof typeof is
    // readable enough. here I'm saying that key is either
    // 'position', 'rotation' or 'scale'.
    key: keyof typeof snap,
    position: number,
  ) => {
    if (!transformWrite) return;

    transformWrite[key][position] = Number(e.currentTarget.value);
  };

  return (
    <>
      {(Object.keys(snap) as (keyof typeof snap)[]).map((key) => {
        return (
          // TODO(m1k53r): I'm not a fan of typing the classes
          // everytime we create an inspector for new component.
          // I'm thinking about making a HOC out of this, but
          // on the other hand it seems too abstract
          // for such little component. idk.
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
