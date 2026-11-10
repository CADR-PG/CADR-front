import { AssetsFileMinimal } from '@/types/Assets';
import { Component } from '../Component';
import { ECS } from '../ECS';

export default class ScriptHolder implements Component {
  constructor(public scripts: AssetsFileMinimal[] = []) {}
  name: string = 'ScriptHolder';
}

ECS.instance.entityManager.registerComponent(ScriptHolder);
