import { MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { useEditorContext } from '../../hooks/useEditorContext';
import { ChangeEvent, useCallback, useRef } from 'react';
import useSaveScene from '../../hooks/useSaveScene';
import { useParams } from 'react-router-dom';
import SnackbarProvider from '../SnackbarProvider';
import SceneData from '../../types/SaveSceneData';
import useEntityManager from '../../hooks/useEntityManager';
import { useSnackbarStore } from '../../stores/snackbarStore';

function FileNavigationItem() {
  const em = useEntityManager();
  const { focus } = useEditorContext();
  const { mutate } = useSaveScene();
  const { uuid } = useParams();
  const filePickerRef = useRef<(HTMLInputElement | null)[]>([]);
  const { openSnackbar } = useSnackbarStore();

  const serializeScene = () => {
    const entities = em.getScene();
    mutate({
      id: uuid ? uuid : '',
      data: entities,
    });
  };

  const deserializeScene = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;

    focus(null);
    const text = await e.target.files[0].text();
    try {
      const json = JSON.parse(text) as SceneData;
      em.setScene(json.data);
    } catch (error) {
      openSnackbar(`Error while parsing JSON: ${error}`, 'error');
    }
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
      <SnackbarProvider />
    </>
  );
}

export default FileNavigationItem;
