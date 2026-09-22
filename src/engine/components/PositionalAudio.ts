import { ECS } from '../ECS';
import cAudio from './Audio';

export class cPositionalAudio implements cAudio {
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
    public coneInnerAngle: number = 360,
    public coneOuterAngle: number = 360,
    public coneOuterGain: number = 0,
    public distanceModel: 'linear' | 'inverse' | 'exponential' = 'inverse',
    public maxDistance: number = 10000,
    public refDistance: number = 1,
    public rolloffFactor: number = 1,
  ) {}
  name = 'PositionalAudio';
  element = 'paudio';
}

ECS.instance.entityManager.registerComponent(cPositionalAudio);
