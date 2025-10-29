import { MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { SceneObject } from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';
import { ChangeEvent, useCallback, useRef } from 'react';
import GenericGLTF from '../GLTFController';
import useSaveScene from '../../hooks/useSaveScene';
import { useParams } from 'react-router-dom';
import SnackbarProvider from '../SnackbarProvider';
import { ECS } from '../../engine/ECS';
import SceneData from '../../types/SaveSceneData';

function FileNavigationItem() {
  const { sceneObjects, setSceneObjects, focus } = useEditorContext();
  const { mutate } = useSaveScene();
  const { uuid } = useParams();
  const filePickerRef = useRef<(HTMLInputElement | null)[]>([]);

  const serializeScene = () => {
    const entities = ECS.instance.getEntities();
    const components = ECS.instance.getAllComponents();
    const sceneData = {
      entities,
      components,
    };
    console.log('saving data');
    console.log(sceneData);
    mutate({
      id: uuid ? uuid : '',
      data: sceneData,
    });
  };

  const deserializeScene = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;

    focus(null);
    const text = await e.target.files[0].text();
    const json = JSON.parse(text) as SceneData;
    ECS.instance.setEntities(json.data.entities);
    ECS.instance.setComponents(json.data.components);
  };

  const openModel = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;

    const model = e.target.files[0];
    const url = URL.createObjectURL(model);

    const uuid = crypto.randomUUID();
    const object: SceneObject = {
      name: 'Model',
      component: () => <GenericGLTF objectUuid={uuid} url={url} />,
    };

    setSceneObjects({ ...sceneObjects, [uuid]: object });
  };

  const setRef = useCallback((index: number) => {
    return (node: HTMLInputElement | null) => {
      filePickerRef.current[index] = node;
    };
  }, []);

  return (
    <>
      <NavigationItem label="File">
        <MenuItem onClick={() => serializeScene()}>Save</MenuItem>
        <MenuItem onClick={() => filePickerRef.current[0]?.click()}>
          Open...
        </MenuItem>
        <MenuItem onClick={() => filePickerRef.current[1]?.click()}>
          Import...
        </MenuItem>
      </NavigationItem>
      <input ref={setRef(0)} type="file" onChange={deserializeScene} hidden />
      <input ref={setRef(1)} type="file" onChange={openModel} hidden />
      <SnackbarProvider />
    </>
  );
}

export default FileNavigationItem;
