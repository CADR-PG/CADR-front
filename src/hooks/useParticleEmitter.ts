import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Object3D } from 'three';
import System, {
  SpriteRenderer,
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  RadialVelocity,
  Vector3D,
  Alpha,
  Scale,
  Color,
  Gravity,
  BodySprite,
  PointZone,
} from 'three-nebula';
import ParticleEmitter from '../engine/components/ParticleEmitter';

export const PARTICLE_SHAPES = ['dot', 'star', 'spark'] as const;
export type ParticleShape = (typeof PARTICLE_SHAPES)[number];

const shapeTextureCache = new Map<string, string>();

function drawDot(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
}

function drawStar(ctx: CanvasRenderingContext2D) {
  const horizontal = ctx.createLinearGradient(0, 32, 64, 32);
  horizontal.addColorStop(0, 'rgba(255,255,255,0)');
  horizontal.addColorStop(0.5, 'rgba(255,255,255,1)');
  horizontal.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = horizontal;
  ctx.fillRect(0, 27, 64, 10);

  const vertical = ctx.createLinearGradient(32, 0, 32, 64);
  vertical.addColorStop(0, 'rgba(255,255,255,0)');
  vertical.addColorStop(0.5, 'rgba(255,255,255,1)');
  vertical.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = vertical;
  ctx.fillRect(27, 0, 10, 64);

  const glow = ctx.createRadialGradient(32, 32, 0, 32, 32, 14);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(32, 32, 14, 0, Math.PI * 2);
  ctx.fill();
}

function drawSpark(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 32, 64, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(32, 32, 32, 5, 0, 0, Math.PI * 2);
  ctx.fill();
}

const shapeDrawers: Record<string, (ctx: CanvasRenderingContext2D) => void> = {
  dot: drawDot,
  star: drawStar,
  spark: drawSpark,
};

export function getParticleShapeTexture(shape: string): string {
  const cached = shapeTextureCache.get(shape);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const draw = shapeDrawers[shape] ?? drawDot;
  draw(ctx);

  const url = canvas.toDataURL();
  shapeTextureCache.set(shape, url);
  return url;
}

function hex(n: number): string {
  const clamped = Math.max(0, Math.min(0xffffff, Math.floor(n)));
  return `#${clamped.toString(16).padStart(6, '0')}`;
}

interface UseParticleEmitterProps {
  container: Object3D | null;
  params: ParticleEmitter;
}

export default function useParticleEmitter({
  container,
  params,
}: UseParticleEmitterProps) {
  const systemRef = useRef<System | null>(null);

  useEffect(() => {
    if (!container || !params.enabled) return;

    const system = new System();
    const renderer = new SpriteRenderer(container, THREE);
    const emitter = new Emitter();

    emitter
      .setRate(
        new Rate(
          new Span(params.particlesPerEmission),
          new Span(params.emissionInterval),
        ),
      )
      .setInitializers([
        new Position(new PointZone(0, 0, 0)),
        new Mass(1),
        new Radius(params.radiusMin, params.radiusMax),
        new Life(params.lifeMin, params.lifeMax),
        new RadialVelocity(
          params.speed,
          new Vector3D(
            params.direction[0],
            params.direction[1],
            params.direction[2],
          ),
          params.spreadAngle,
        ),
        new BodySprite(THREE, getParticleShapeTexture(params.shape)),
      ])
      .setBehaviours([
        new Alpha(params.alphaStart, params.alphaEnd),
        new Scale(params.scaleStart, params.scaleEnd),
        new Color(hex(params.colorStart), hex(params.colorEnd)),
        ...(params.gravity !== 0 ? [new Gravity(params.gravity)] : []),
      ])
      .emit();

    system.addRenderer(renderer).addEmitter(emitter);
    systemRef.current = system;

    return () => {
      system.destroy();
      systemRef.current = null;
    };
  }, [
    container,
    params.enabled,
    params.particlesPerEmission,
    params.emissionInterval,
    params.lifeMin,
    params.lifeMax,
    params.radiusMin,
    params.radiusMax,
    params.speed,
    params.spreadAngle,
    params.direction[0],
    params.direction[1],
    params.direction[2],
    params.gravity,
    params.alphaStart,
    params.alphaEnd,
    params.scaleStart,
    params.scaleEnd,
    params.shape,
    params.colorStart,
    params.colorEnd,
  ]);

  return systemRef;
}
