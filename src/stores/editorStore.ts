import { create } from 'zustand';
import { Dispatch, SetStateAction } from 'react';
import { SceneObjects } from '../types/SceneObject';
import { Entity } from '../engine/Entity';
import { Component } from '../engine/Component';

interface State {
  sceneObjects: SceneObjects;
  focused: string | null;
  entities: Entity[];
  components: Component[];
}

interface Action {
  setSceneObjects: Dispatch<SetStateAction<SceneObjects>>;
  focus: Dispatch<SetStateAction<string | null>>;
}

const useEditor = create<(State & Action) | undefined>(() => undefined);

export default useEditor;
