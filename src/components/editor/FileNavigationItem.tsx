import { MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { SceneObject, SceneObjects } from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';
import { downloadJSON } from '../../utils';
import { ChangeEvent, useCallback, useRef } from 'react';
import * as THREE from 'three';
import GenericGLTF from '../GLTFController';
import GenericPrimitive from '../PrimitiveController';

function parseScene(obj: THREE.Object3D): SceneObjects {
  const newObjects: SceneObjects = {};

  obj.traverse((o) => {
    const mesh = o as THREE.Mesh;
    console.log(mesh);
    //if (!mesh.isMesh) return;

    const uuid = crypto.randomUUID();
    const object: SceneObject = {
      name: mesh.geometry? mesh.geometry.type.replace('Geometry', '') : "dupa",
      component: () => (
        <GenericPrimitive
          objectUuid={uuid}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          object={mesh}
        />
      ),
    };

    newObjects[uuid] = object;
  });

  return newObjects;
}

function FileNavigationItem() {
  const { sceneObjects, setSceneObjects, focus } = useEditorContext();
  const filePickerRef = useRef<(HTMLInputElement | null)[]>([]);
  const loader = new THREE.ObjectLoader();

  const saveScene = () => {
    if (Object.values(sceneObjects).length == 0) return;

    console.log(Object.values(sceneObjects)[0].ref?.parent?.toJSON());
    downloadJSON(
      // TODO: this is quite dumb, but will work for now.
      // if we add support for groups in the future
      // then this shit has to be changed
      Object.values(sceneObjects)[0].ref?.parent?.toJSON(),
      'scene.json',
    );
  };

  const openScene = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;

    focus(null);
    const text = await e.target.files[0].text();
    const json = JSON.parse(text);
    loader.parse(json, (obj) => setSceneObjects(parseScene(obj)));
  };

  const openModel = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;

    const model = e.target.files[0];
    const url = URL.createObjectURL(model);

    const uuid = crypto.randomUUID();
    const object: SceneObject = {
      name: 'Model',
      component: () => (
        <GenericGLTF
          objectUuid={uuid}
          url={url}
        />
      ),
    };

    setSceneObjects({...sceneObjects, [uuid]: object})
  }

  const setRef = useCallback((index: number) => {
    return (node: HTMLInputElement | null) => {
      filePickerRef.current[index] = node;
    };
  }, []);


  return (
    <>
      <NavigationItem label="File">
        <MenuItem onClick={() => saveScene()}>Save</MenuItem>
        <MenuItem onClick={() => filePickerRef.current[0]?.click()}>Open...</MenuItem>
        <MenuItem onClick={() => filePickerRef.current[1]?.click()}>Import...</MenuItem>
      </NavigationItem>
      <input ref={setRef(0)} type="file" onChange={openScene} hidden />
      <input ref={setRef(1)} type="file" onChange={openModel} hidden />
    </>
  )
}

export default FileNavigationItem;
