import { Euler, Matrix4, Quaternion, Vector3 } from 'three';
import { snapshot } from 'valtio';
import Parent from './components/Parent';
import { ECS } from './ECS';
import { Entity } from './Entity';
import Transform from './components/Transform';
import Children from './components/Children';
import RBody from './components/RigidBody';
import Invisible from './components/Invisible';
import NestedScene from './components/NestedScene';
import { Component } from './Component';

const ROTATION_ORDER = 'YXZ';

export function setParent(parent: Entity | null, child: Entity) {
  if (parent === child) return;
  if (parent && isDescendant(parent, child)) return;
  const em = ECS.instance.entityManager;

  const oldParent = em.getComponent(Parent, child)?.entity ?? null;
  if (parent === oldParent) return;

  const world = getWorldMatrix(child);

  // remove child from original parent
  if (oldParent) {
    const oldChildren = em.getComponent(Children, oldParent);
    if (oldChildren) {
      oldChildren.children = oldChildren?.children.filter((c) => c !== child);
    }
  }
  em.removeComponent(Parent, child);

  // attach child to new parent and add new child to the new parent
  if (parent) {
    em.addComponent(new Parent(parent), child);

    if (em.has(Children, parent)) {
      em.getComponent(Children, parent)?.children.push(child);
    } else {
      em.addComponent(new Children([child]), parent);
    }
  }

  // set new local transform
  const transform = em.getComponent(Transform, child);
  if (transform) {
    const local = parent
      ? getWorldMatrix(parent).invert().multiply(world)
      : world;
    applyMatrix(transform, local);
  }
}

// Deep-clones `entity` (and all of its descendants) as a new entity parented
// under `parent`, preserving the original's world transform - consistent with
// how reparenting via `setParent` preserves world position elsewhere.
//
// `setParent` is deliberately called LAST, after the whole subtree has been
// cloned. `parent` may be `entity` itself, or any other descendant of it
// (pasting a copied tree back into itself/one of its own children) - calling
// setParent early would push the newly created clone into that node's real
// `Children` array, and since that same node gets visited again further down
// this recursion (it's part of the tree being duplicated), the clone would
// get read back as one of its own "original" children and cloned into itself
// forever.
export function cloneEntityTree(entity: Entity, parent: Entity): Entity {
  const em = ECS.instance.entityManager;
  const world = getWorldMatrix(entity);
  const children = [...(em.getComponent(Children, entity)?.children ?? [])];
  const newEntity = em.createEntity();

  const components = structuredClone(snapshot(em.getComponents(entity))) as {
    [name: string]: Component;
  };
  delete components['Parent'];
  delete components['Children'];

  for (const component of Object.values(components)) {
    em.addComponent(component, newEntity);
  }

  const transform = em.getComponent(Transform, newEntity);
  if (transform) {
    applyMatrix(transform, world);
  }

  for (const child of children) {
    cloneEntityTree(child, newEntity);
  }

  setParent(parent, newEntity);

  return newEntity;
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
      new Euler(t.rotation[0], t.rotation[1], t.rotation[2], ROTATION_ORDER),
    ),
    new Vector3(t.scale[0], t.scale[1], t.scale[2]),
  );
}

export function applyMatrix(t: Transform, m: Matrix4) {
  const p = new Vector3();
  const q = new Quaternion();
  const s = new Vector3();
  m.decompose(p, q, s);
  const r = new Euler().setFromQuaternion(q, ROTATION_ORDER);
  t.position = [p.x, p.y, p.z];
  t.rotation = [r.x, r.y, r.z];
  t.scale = [s.x, s.y, s.z];
}

export function isInRigidBody(entity: Entity) {
  const parent = ECS.instance.entityManager.getComponent(
    Parent,
    entity,
  )?.entity;

  if (!parent) return false;
  const rb = ECS.instance.entityManager.getComponent(RBody, parent);
  if (rb) return true;

  return isInRigidBody(parent);
}

export function flattenHierarchy(entity: Entity) {
  const array: string[] = [];
  const children = ECS.instance.entityManager.getComponent(
    Children,
    entity,
  )?.children;

  if (!children) return array;

  for (const child of children) {
    array.push(child, ...flattenHierarchy(child));
  }

  return array;
}

// TODO: xd
// used only for RigidBodyController because I can't code
export function getWorldTransformOmitRoot(entity: Entity): Transform {
  const em = ECS.instance.entityManager;

  function calculateWorld(entity: Entity): Matrix4 {
    const t = em.getComponent(Transform, entity);
    const local = t ? toMatrix(t) : new Matrix4();
    const parent = em.getComponent(Parent, entity)?.entity;
    return parent ? calculateWorld(parent).multiply(local) : new Matrix4();
  }

  const world = calculateWorld(entity);
  const newT = new Transform();
  applyMatrix(newT, world);

  return newT;
}

export function isInvisible(entity: Entity) {
  const invisible = ECS.instance.entityManager.getComponent(Invisible, entity);
  if (invisible) return true;

  const parent = ECS.instance.entityManager.getComponent(
    Parent,
    entity,
  )?.entity;
  if (!parent) return false;

  return isInvisible(parent);
}

export function isNestedScene(entity: Entity) {
  const parent = ECS.instance.entityManager.getComponent(
    Parent,
    entity,
  )?.entity;

  if (!parent) return false;

  const nestedScene = ECS.instance.entityManager.getComponent(
    NestedScene,
    parent,
  );

  if (nestedScene) return true;

  return isNestedScene(parent);
}

export function getNestedParent(entity: Entity) {
  const parent = ECS.instance.entityManager.getComponent(
    Parent,
    entity,
  )?.entity;

  if (!parent) return null;

  const nestedScene = ECS.instance.entityManager.getComponent(
    NestedScene,
    parent,
  );

  if (nestedScene) return parent;

  return getNestedParent(parent);
}
