import { Euler, Matrix4, Quaternion, Vector3 } from 'three';
import Parent from './components/Parent';
import { ECS } from './ECS';
import { Entity } from './Entity';
import Transform from './components/Transform';
import Children from './components/Children';

export function setParent(parent: Entity | null, child: Entity) {
  if (parent === child) return;
  if (parent && isDescendant(parent, child)) return;

  const oldParent =
    ECS.instance.entityManager.getComponent(Parent, child)?.entity ?? null;
  if (parent === oldParent) return;

  const world = getWorldMatrix(child);

  // remove child from original parent
  if (oldParent) {
    const oldChildren = ECS.instance.entityManager.getComponent(
      Children,
      oldParent,
    );
    if (oldChildren) {
      oldChildren.children = oldChildren?.children.filter((c) => c !== child);
    }
  }
  ECS.instance.entityManager.removeComponent(Parent, child);

  // attach child to new parent and add new child to the new parent
  if (parent) {
    ECS.instance.entityManager.addComponent(new Parent(parent), child);

    if (ECS.instance.entityManager.has(Children, parent)) {
      ECS.instance.entityManager
        .getComponent(Children, parent)
        ?.children.push(child);
    } else {
      ECS.instance.entityManager.addComponent(new Children([child]), parent);
    }
  }

  // set new local transform
  const transform = ECS.instance.entityManager.getComponent(Transform, child);
  if (transform) {
    const local = parent
      ? getWorldMatrix(parent).invert().multiply(world)
      : world;
    applyMatrix(transform, local);
  }
}

function isDescendant(entity: Entity, ancestor: Entity) {
  let current =
    ECS.instance.entityManager.getComponent(Parent, entity)?.entity ?? null;
  while (current) {
    if (current === ancestor) return true;
    current =
      ECS.instance.entityManager.getComponent(Parent, current)?.entity ?? null;
  }
  return false;
}

export function getWorldMatrix(entity: Entity): Matrix4 {
  const t = ECS.instance.entityManager.getComponent(Transform, entity);
  const local = t ? toMatrix(t) : new Matrix4();
  const parent = ECS.instance.entityManager.getComponent(
    Parent,
    entity,
  )?.entity;
  return parent ? getWorldMatrix(parent).multiply(local) : local;
}

export function toMatrix(t: Transform): Matrix4 {
  return new Matrix4().compose(
    new Vector3(t.position[0], t.position[1], t.position[2]),
    new Quaternion().setFromEuler(
      new Euler(t.rotation[0], t.rotation[1], t.rotation[2]),
    ),
    new Vector3(t.scale[0], t.scale[1], t.scale[2]),
  );
}

export function applyMatrix(t: Transform, m: Matrix4) {
  const p = new Vector3();
  const q = new Quaternion();
  const s = new Vector3();
  m.decompose(p, q, s);
  const r = new Euler().setFromQuaternion(q);
  t.position = [p.x, p.y, p.z];
  t.rotation = [r.x, r.y, r.z];
  t.scale = [s.x, s.y, s.z];
}
