import { useRef } from 'react';
import { ECS } from '../engine/ECS';
import { Entity } from '../engine/Entity';

export default function useEntityRef(entity: Entity) {
  const ref = useRef(null!);
  ECS.instance.entityManager.refs[entity] = ref;
  return ref;
}
