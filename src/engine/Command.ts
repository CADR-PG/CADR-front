import { Component, ComponentType } from './Component';
import Command from '@/types/Command';
import Transform, { Vec3 } from './components/Transform';
import { GeometryPointsData } from '@/types/GeometryPointsData';
import { CollisionGroupsComponent } from '@/types/CollisionGroupsProps';
import { createEntity, Entity } from './Entity';
import { ECS } from './ECS';
import Parent from './components/Parent';
import { setParent } from './Hierarchy';
import { AssetsFile } from '@/types/Assets';
import { loadExternalScene } from './Scene';
import { SetStateAction } from 'react';

export function makeSetCommand<T extends Component, S = T>(
  value: unknown,
  write: S,
  key: keyof S,
): Command {
  console.log(`Setting ${value} for ${String(key)}`);
  const prevValue = write[key];
  return {
    execute: () => {
      (write as Record<keyof S, unknown>)[key] = value;
    },
    undo: () => {
      (write as Record<keyof S, unknown>)[key] = prevValue;
    },
  };
}

export function makeSetVec3Command<T extends Component, S = T>(
  value: number,
  write: S,
  key: keyof S,
  index: 0 | 1 | 2,
): Command {
  console.log(`Setting ${value} for ${String(key)}`);
  const prevValue = (write as Record<keyof S, Vec3>)[key][index];
  return {
    execute: () => {
      (write as Record<keyof S, Vec3>)[key][index] = value;
    },
    undo: () => {
      (write as Record<keyof S, Vec3>)[key][index] = prevValue;
    },
  };
}

export function makeSetPointsCommand(
  value: number | null,
  write: GeometryPointsData,
  index: number,
  xy: number,
): Command {
  console.log(`Setting ${value} for ${String(index)}`);
  const prevValue = write.points[index][xy];
  return {
    execute: () => {
      write.points[index][xy] = Number(value);
    },
    undo: () => {
      write.points[index][xy] = Number(prevValue);
    },
  };
}

export function makePushPointsCommand(write: GeometryPointsData) {
  return {
    execute: () => {
      write.points.push([0, 0]);
    },
    undo: () => {
      write.points.pop();
    },
  };
}

export function makePopPointsCommand(write: GeometryPointsData) {
  const prevValue = write.points[write.points.length - 1];
  return {
    execute: () => {
      write.points.pop();
    },
    undo: () => {
      write.points.push(prevValue);
    },
  };
}

export function makeSetCollisionCommand(
  write: Component & CollisionGroupsComponent,
  bit: number,
) {
  return {
    execute: () => {
      write.collisionGroups ^= bit;
    },
    undo: () => {
      write.collisionGroups ^= bit;
    },
  };
}

export function makeSetDataCommand(
  entity: Entity,
  componentType: ComponentType,
  component: Component,
) {
  const prevValue = ECS.instance.entityManager.getComponent(
    componentType,
    entity,
  );
  return {
    execute: () => {
      ECS.instance.entityManager.removeComponent(componentType, entity);
      ECS.instance.entityManager.addComponent(component, entity);
    },
    undo: () => {
      ECS.instance.entityManager.removeComponent(componentType, entity);
      if (prevValue) {
        ECS.instance.entityManager.addComponent(prevValue, entity);
      }
    },
  };
}

export function makeAddComponentCommand(instance: any, entity: Entity) {
  return {
    execute: () => {
      ECS.instance.entityManager.addComponent(instance, entity);
    },
    undo: () => {
      // TODO: maybe a bad idea? idk
      ECS.instance.entityManager.removeComponentByName(instance.name, entity);
    },
  };
}

export function makeRemoveComponentCommand<T extends Component>(
  component: ComponentType<T>,
  entity: Entity,
) {
  const prevValue = ECS.instance.entityManager.getComponent(component, entity);
  return {
    execute: () => {
      ECS.instance.entityManager.removeComponent(component, entity);
    },
    undo: () => {
      if (prevValue) {
        ECS.instance.entityManager.addComponent(prevValue, entity);
      }
    },
  };
}

export function makeSetParentCommand(parent: Entity, child: Entity) {
  const prevValue = ECS.instance.entityManager.getComponent(
    Parent,
    child,
  )?.entity;
  return {
    execute: () => {
      setParent(parent, child);
    },
    undo: () => {
      if (prevValue) {
        setParent(prevValue, child);
      } else {
        setParent(null, child);
      }
    },
  };
}

// NOTE: this command is a hack because there is no easy way to undo this action
export async function makeLoadSceneCommand(uuid: string, item: AssetsFile) {
  const scene = await loadExternalScene(uuid!, item);
  return {
    execute: () => {},
    undo: () => {
      ECS.instance.entityManager.destroyEntity(scene);
    },
  };
}

// NOTE/TODO: another questionable command, but I seriously don't know how to
// handle entity creation lol
export function makeCreateEntityCommand(
  focused: Entity | null,
  focus: (value: SetStateAction<string | null>) => void,
  addComponents: (entity: Entity) => void,
) {
  const entity = createEntity();
  return {
    execute: () => {
      addComponents(entity);
      if (focused) {
        setParent(focused, entity);
      }
      focus(entity);
    },
    undo: () => {
      ECS.instance.entityManager.destroyEntity(entity);
      focus(null);
    },
  };
}

// TODO: fuuuuuuuck
export function makeDestroyEntityCommand(
  entity: Entity,
  focus: (value: SetStateAction<string | null>) => void,
) {
  // PERF: potential big memory usage?
  const prevValue = ECS.instance.entityManager.getComponents(entity);
  return {
    execute: () => {
      ECS.instance.entityManager.destroyEntity(entity);
      focus(null);
    },
    undo: () => {
      const newEntity = createEntity();
      ECS.instance.entityManager.getScene().entities[newEntity] = prevValue;
      focus(newEntity);
    },
  };
}

// TODO: so ok, this pattern is pretty sweet but it doesn't work well in some scenarios.
// ideally, execute would be treated as a redo function, but I don't really care that
// much for redo honestly. it bothers me, yes, but at this point I have to be pragmatic.
// in the future maybe I will come up with something better, but for now it's enough
export function makeDragCommand(
  write: Transform,
  position: Vec3,
  rotation: Vec3,
  scale: Vec3,
) {
  return {
    execute: () => {},
    undo: () => {
      write.position = position;
      write.rotation = rotation;
      write.scale = scale;
    },
  };
}
