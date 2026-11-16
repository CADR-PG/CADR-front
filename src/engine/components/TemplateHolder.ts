import { AssetsFileMinimal } from '@/types/Assets';
import { Component } from '../Component';
import { ECS } from '../ECS';

export default class TemplateHolder implements Component {
  constructor(public templates: AssetsFileMinimal[] = []) {}
  name: string = 'TemplateHolder';
}

ECS.instance.entityManager.registerComponent(TemplateHolder);
