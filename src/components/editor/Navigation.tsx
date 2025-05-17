import { Button, MenuItem } from '@mui/material';
import Objects from '../../data/ObjectNames';
import NavigationItem from './NavigationItem';
import { SceneObject } from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';
import { downloadJSON } from '../../utils';
import { ChangeEvent, useRef } from 'react';
import * as THREE from 'three';

function Navigation() {
  const { sceneObjects, setSceneObjects } = useEditorContext();
  const filePickerRef = useRef<HTMLInputElement>(null!);
  const loader = new THREE.ObjectLoader();

  const handleAdd = (object: SceneObject) => {
    const uuid = crypto.randomUUID();
    setSceneObjects({ ...sceneObjects, [uuid]: object });
  };

  const saveScene = () => {
    // this is quite dumb, but will work for now.
    // if we add support for groups in the future
    // then this shit has to be changed
    const group = new THREE.Group();
    Object.values(sceneObjects).forEach(object => group.add(object.ref!));
    console.log(group);
    downloadJSON(group, "scene.json");
  }

  const openScene = async (e: ChangeEvent<HTMLInputElement>) => {
    const text = await e.target.files![0].text();
    const json = JSON.parse(text);
    loader.parse(json,
      function (obj) {
        obj.traverse(o => console.log(o));
      }
    )
  }

  const openFilePicker = ()  => {
    filePickerRef.current.click();
  }

  return (
    <div className="tool-bar">
      <NavigationItem label="File">
        <MenuItem onClick={() => saveScene()}>
          Save
        </MenuItem>
        <MenuItem onClick={() => openFilePicker()}>
          Open...
        </MenuItem>
      </NavigationItem>
      <NavigationItem label="Shapes">
        {Objects.map((object) => (
          <MenuItem key={object.id} onClick={() => handleAdd(object)}>
            {object.name}
          </MenuItem>
        ))}
      </NavigationItem>
      <input ref={filePickerRef} type="file" onChange={openScene} hidden />
    </div>
  );
}

export default Navigation;
