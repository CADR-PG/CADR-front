import { Button } from '@mui/material';
import useEntityManager from '../../../hooks/useEntityManager';
import { ECS } from '../../../engine/ECS';
import { Component, ComponentType } from '../../../engine/Component';
import { Entity } from '../../../engine/Entity';

function dec2bin(dec: number) {
  return (dec >>> 0).toString(2);
}

interface CollisionGroupsComponent {
  collisionGroups: number;
}

interface CollisionGroupsProps<T extends Component & CollisionGroupsComponent> {
  entity: Entity;
  component: ComponentType<T>;
}

export default function CollisionGroups<
  T extends Component & CollisionGroupsComponent,
>({ entity, component }: CollisionGroupsProps<T>) {
  const em = useEntityManager();
  const c = em.getComponent(component, entity);
  const cw = ECS.instance.entityManager.getComponent(component, entity);
  const handleClick = (index: number, collider: boolean) => {
    const i = collider ? index + 16 : index;
    const bit = Math.pow(2, i);
    cw!.collisionGroups ^= bit;
  };

  return (
    <div>
      <div className="collision-groups">
        {dec2bin((c!.collisionGroups & 0b111111110000000000000000) >> 16)
          .padStart(8, '0')
          .split('')
          .reverse()
          .map((value) => (value === '1' ? true : false))
          .map((value, index) => (
            <Button
              className="collision-child"
              disableRipple
              variant="contained"
              color={value ? 'secondary' : 'primary'}
              onClick={() => {
                handleClick(index, true);
              }}
              key={index}
            >
              {index}
            </Button>
          ))}
      </div>
      <hr />
      <div className="collision-groups">
        {dec2bin(c!.collisionGroups & 0b11111111)
          .padStart(8, '0')
          .split('')
          .reverse()
          .map((value) => (value === '1' ? true : false))
          .map((value, index) => (
            <Button
              className="collision-child"
              disableRipple
              variant="contained"
              color={value ? 'secondary' : 'primary'}
              onClick={() => {
                handleClick(index, false);
              }}
              key={index}
            >
              {index}
            </Button>
          ))}
      </div>
    </div>
  );
}
