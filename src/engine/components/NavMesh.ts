import { Component } from '../Component';
import { ECS } from '../ECS';
import * as RECAST from 'recast-navigation';

export default class NavMesh implements Component {
  constructor(
    public source: string = '',
    public mesh: RECAST.NavMesh | null = null,
  ) {}

  name = 'NavMesh';
  element = 'navmesh';
}

ECS.instance.entityManager.registerComponent(NavMesh);
