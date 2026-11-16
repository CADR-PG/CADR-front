import { playAnimation, stopAnimation } from '@/engine/Animation';
import { Component } from '@/engine/Component';
import cAudio from '@/engine/components/Audio';
import { Camera } from '@/engine/components/Camera';
import Collider from '@/engine/components/Collider';
import Geometry from '@/engine/components/Geometry';
import GLTF from '@/engine/components/GLTF';
import Invisible from '@/engine/components/Invisible';
import Light from '@/engine/components/Light';
import Material from '@/engine/components/Material';
import Mesh from '@/engine/components/Mesh';
import Name from '@/engine/components/Name';
import { cPositionalAudio } from '@/engine/components/PositionalAudio';
import RBody from '@/engine/components/RigidBody';
import Transform from '@/engine/components/Transform';
import UserComponent from '@/engine/components/UserComponent';
import { ECS } from '@/engine/ECS';
import { EntityManager } from '@/engine/EntityManager';
import { EventBus } from '@/engine/EventBus';
import { System } from '@/engine/System';
import useEntityManager from '@/hooks/useEntityManager';
import { useConsoleStore } from '@/stores/consoleStore';
import Controls from '@/types/Controls';
import { useKeyboardControls } from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';
import { loadExternalScene } from '@/engine/Scene';
import {
  destroyTree,
  destroyTreeUnsafe,
  searchByName,
  searchTree,
} from '@/engine/Entity';
import { waitForBody } from '@/engine/Waiter';
import * as RECAST from 'recast-navigation';
import NavMesh from '@/engine/components/NavMesh';
import * as RECAST_HELPERS from '@recast-navigation/three';
import { getWorldTransform } from '@/engine/Hierarchy';
import useDownloadFile from '@/hooks/useDownloadFile';
import { normalizeUrl } from '@/engine/components/helpers/material';
import useSearchTree from '@/hooks/useSearchTree';
import useFont from '@/hooks/useFont';

export const sdk = {
  ECS,
  System,
  Name,
  Transform,
  EventBus,
  EntityManager,
  cAudio,
  cPositionalAudio,
  Collider,
  Mesh,
  GLTF,
  Invisible,
  Light,
  Material,
  RBody,
  Component,
  UserComponent,
  Geometry,
  React,
  useEntityManager,
  useKeyboardControls,
  Controls,
  playAnimation,
  stopAnimation,
  useConsoleStore,
  Camera,
  THREE,
  loadExternalScene,
  destroyTree,
  searchTree,
  waitForBody,
  RECAST,
  NavMesh,
  RECAST_HELPERS,
  getWorldTransform,
  searchByName,
  useDownloadFile,
  normalizeUrl,
  useSearchTree,
  useFont,
  destroyTreeUnsafe,
};
