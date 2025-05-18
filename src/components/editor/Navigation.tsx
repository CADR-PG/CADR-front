import { MenuItem } from '@mui/material';
import Objects from '../../data/ObjectNames';
import NavigationItem from './NavigationItem';
import { SceneObject } from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';
import { downloadJSON } from '../../utils';
import { ChangeEvent, useRef } from 'react';
import * as THREE from 'three';
import GenericPrimitive from '../PrimitiveController';
import { SceneObjects } from '../../types/SceneObject';

function parseScene(obj: THREE.Object3D): SceneObjects {
  const newObjects: SceneObjects = {};

  obj.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || mesh.geometry.type == 'BufferGeometry') return;

    const uuid = crypto.randomUUID();
    const object: SceneObject = {
      name: mesh.geometry.type.replace('Geometry', ''),
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

function Navigation() {
  const { sceneObjects, setSceneObjects, focus } = useEditorContext();
  const filePickerRef = useRef<HTMLInputElement>(null!);
  const loader = new THREE.ObjectLoader();

  const handleAdd = (object: SceneObject) => {
    const uuid = crypto.randomUUID();
    setSceneObjects({ ...sceneObjects, [uuid]: object });
  };

  const saveScene = () => {
    if (Object.values(sceneObjects).length == 0) return;

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

  const openFilePicker = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="tool-bar">
      <NavigationItem label="File">
        <MenuItem onClick={() => saveScene()}>Save</MenuItem>
        <MenuItem onClick={() => openFilePicker()}>Open...</MenuItem>
      </NavigationItem>
      <NavigationItem label="Shapes">
        {Objects.map((object) => (
          <MenuItem key={object.name} onClick={() => handleAdd(object)}>
            {object.name}
          </MenuItem>
        ))}
      </NavigationItem>
      <input ref={filePickerRef} type="file" onChange={openScene} hidden />
    </div>
  );
}

export default Navigation;
