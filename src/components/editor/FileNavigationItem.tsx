import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import NavigationItem from './NavigationItem';
import { useEditorContext } from '../../hooks/useEditorContext';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import useSaveScene from '../../hooks/useSaveScene';
import { useParams } from 'react-router-dom';
import SnackbarProvider from '../SnackbarProvider';
import { useState } from 'react';
import SceneData from '../../types/SaveSceneData';
import useEntityManager from '../../hooks/useEntityManager';
import { useSnackbarStore } from '../../stores/snackbarStore';
import useUploadFile from '@/hooks/useUploadFile';
import { useAssetsStore } from '@/stores/assetsStore';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import useReplaceFile from '@/hooks/useReplaceFile';
import SceneJSON from '@/types/SceneJSON';
import { ECS } from '@/engine/ECS';
import RequestFileUploadResponse from '@/types/RequestFileUploadResponse';
import { AssetsFileUploadReadModel } from '@/types/Assets';

function FileNavigationItem() {
  const em = useEntityManager();
  const { focus, camera } = useEditorContext();
  const { scenes, updateScene } = useEditorSettingsStore();
  const { mutate } = useSaveScene();
  const { data, mutate: upload } = useUploadFile();
  const { data: replaceData, mutate: replace } = useReplaceFile();
  const { uuid } = useParams();
  const filePickerRef = useRef<(HTMLInputElement | null)[]>([]);
  const { openSnackbar } = useSnackbarStore();
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(null!);
  const { getDirs, assets } = useAssetsStore();
  const [dir, setDir] = useState<string>(null!);

  useEffect(() => {
    if (!data) return;

    saveSettings(data);
  }, [data]);

  useEffect(() => {
    if (!replaceData) return;

    saveSettings(replaceData);
  }, [replaceData]);

  const saveSettings = (data: {
    data: RequestFileUploadResponse | AssetsFileUploadReadModel;
    directoryId: string;
  }) => {
    const em = ECS.instance.entityManager;
    const cs = {
      id: data.data.id,
      name: data.data.name,
      directoryId: data.directoryId,
    };
    const localScenes = scenes;

    // NOTE: this is a bit dumb, but I don't know man
    localScenes[em.currentScene] = cs;
    mutate({
      id: uuid ? uuid : '',
      data: {
        currentScene: em.currentScene,
        scenes: localScenes,
      },
    });

    updateScene(cs, em.currentScene);
    em.getScene().dirty = false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!assets) return;

    const entities = em.getScene().entities;
    const sceneData: SceneJSON = {
      camera: [camera.position.x, camera.position.y, camera.position.z],
      entities,
    };
    const file = new File(
      [JSON.stringify(sceneData)],
      name.replace('.scene', '') + '.scene',
    );

    upload({ file, directoryId: dir });
    setOpen(false);
  };

  const handleReplace = async () => {
    if (!assets) return;

    const entities = em.getScene().entities;
    const sceneData: SceneJSON = {
      camera: [camera.position.x, camera.position.y, camera.position.z],
      entities,
    };
    const file = new File(
      [JSON.stringify(sceneData)],
      scenes[em.currentScene]?.name?.replace('.scene', '') + '.scene',
    );
    const id = scenes[em.currentScene]?.id;
    const directoryId = scenes[em.currentScene]?.directoryId;
    replace({ file, id, directoryId });
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setDir(event.target.value);
  };

  const saveScene = useCallback(() => {
    const entities = em.getScene();
    mutate({
      id: uuid ? uuid : '',
      data: entities,
    });
  }, [mutate, uuid, em]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // saveScene();
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

        // if new scene, open dialog. save otherwise
        if (!scenes[em.currentScene].name) {
          setOpen(true);
        } else {
          handleReplace();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveScene]);

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
      <SnackbarProvider />
      <Dialog open={open} onClose={handleClose} role="dialog">
        <DialogTitle>Save scene</DialogTitle>
        <DialogContent>
          {assets ? (
            <Select label="Directory" onChange={handleSelect}>
              {getDirs(assets).map((dir) => (
                <MenuItem value={dir.id}>{dir.name}/</MenuItem>
              ))}
            </Select>
          ) : null}
          <TextField
            onChange={(v) => setName(v.currentTarget.value)}
            label="Scene name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FileNavigationItem;
