import { Component } from '../Component';
import { ECS } from '../ECS';

export default class cAudio implements Component {
  constructor(
    public autoplay: boolean = false,
    public duration: number = -1,
    public loopEnd: number = 0,
    public loopStart: number = 0,
    public offset: number = 0,
    public source: string = '',
    public detune: number = 0,
    public loop: boolean = false,
    public playbackRate: number = 1,
    public volume: number = 1,
  ) {}
  name = 'Audio';
  element = 'audio';
}

ECS.instance.entityManager.registerComponent(cAudio);
