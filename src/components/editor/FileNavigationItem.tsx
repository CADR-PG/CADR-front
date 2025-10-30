import { MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { SceneObject } from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import GenericGLTF from '../GLTFController';
import useSaveScene from '../../hooks/useSaveScene';
import { useParams } from 'react-router-dom';
import SnackbarProvider from '../SnackbarProvider';
import { useState } from 'react';
import SceneData from '../../types/SaveSceneData';
import useEntityManager from '../../hooks/useEntityManager';

function FileNavigationItem() {
  const em = useEntityManager();
  const { sceneObjects, setSceneObjects, focus } = useEditorContext();
  const { mutate } = useSaveScene();
  const { uuid } = useParams();
  const filePickerRef = useRef<(HTMLInputElement | null)[]>([]);

  const [secondsLeft, setSecondsLeft] = useState(60);

  const saveScene = useCallback(() => {
    const entities = em.getScene();
    mutate({
      id: uuid ? uuid : '',
      data: entities,
    });
  }, [sceneObjects, mutate, uuid]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          saveScene();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [saveScene]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveScene();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveScene]);

  const deserializeScene = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;

    focus(null);
    const text = await e.target.files[0].text();
    const json = JSON.parse(text) as SceneData;
    em.setScene(json.data);
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
        <MenuItem onClick={() => saveScene()}>Save</MenuItem>
        <MenuItem onClick={() => filePickerRef.current[0]?.click()}>
          Open...
        </MenuItem>
        <MenuItem onClick={() => filePickerRef.current[1]?.click()}>
          Import...
        </MenuItem>
        <MenuItem disabled>Autosave in: {secondsLeft}s</MenuItem>
      </NavigationItem>
      <input ref={setRef(0)} type="file" onChange={deserializeScene} hidden />
      <input ref={setRef(1)} type="file" onChange={openModel} hidden />
      <SnackbarProvider />
    </>
  );
}

export default FileNavigationItem;
