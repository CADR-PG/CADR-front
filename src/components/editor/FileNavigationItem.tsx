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
import { useEffect, useRef } from 'react';
import useSaveScene from '../../hooks/useSaveScene';
import { useParams } from 'react-router-dom';
import SnackbarProvider from '../SnackbarProvider';
import { useState } from 'react';
import useEntityManager from '../../hooks/useEntityManager';
import useUploadFile from '@/hooks/useUploadFile';
import { useAssetsStore } from '@/stores/assetsStore';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import useReplaceFile from '@/hooks/useReplaceFile';
import SceneJSON from '@/types/SceneJSON';
import { ECS } from '@/engine/ECS';
import RequestFileUploadResponse from '@/types/RequestFileUploadResponse';
import { AssetsFileUploadReadModel } from '@/types/Assets';
import External from '@/engine/components/External';
import Parent from '@/engine/components/Parent';
import { snapshot } from 'valtio';
import { EntityToComponent } from '@/engine/EntityManager';

function FileNavigationItem() {
  const em = useEntityManager();
  const { camera } = useEditorContext();
  const { scenes, updateScene, game } = useEditorSettingsStore();
  const { mutate } = useSaveScene();
  const { data, mutate: upload } = useUploadFile();
  const { data: replaceData, mutate: replace } = useReplaceFile();
  const { uuid } = useParams();
  const filePickerRef = useRef<(HTMLInputElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(null!);
  const { getDirs, assets } = useAssetsStore();
  const [dir, setDir] = useState<string>(null!);

  // display confirmation popup if user really wants to leave the page
  // when scene is not saved
  useEffect(() => {
    const exitConfirmationCallback = (event: BeforeUnloadEvent) => {
      const em = ECS.instance.entityManager;
      if (em.scenes.some((s) => s.dirty)) {
        event.preventDefault();
        return '';
      }
    };
    window.addEventListener('beforeunload', exitConfirmationCallback);
    return () => {
      window.removeEventListener('beforeunload', exitConfirmationCallback);
    };
  }, []);

  const saveSettings = (data: {
    data: RequestFileUploadResponse | AssetsFileUploadReadModel;
    directoryId: string;
  }) => {
    const em = ECS.instance.entityManager;
    // Save now to not lose the current scene index on scene change
    const sceneIdx = em.currentScene;
    const cs = {
      id: data.data.id,
      name: data.data.name,
      directoryId: data.directoryId,
    };
    console.log('directorryyyyy', data.directoryId);
    const localScenes = [...scenes];

    // NOTE: this is a bit dumb, but I don't know man
    localScenes[em.currentScene] = cs;
    mutate({
      id: uuid ? uuid : '',
      data: {
        currentScene: sceneIdx,
        scenes: localScenes,
        game,
      },
    });

    updateScene(cs, sceneIdx);
    em.getScene().dirty = false;
  };

  useEffect(() => {
    if (!data) return;

    saveSettings(data);
  }, [data]);

  useEffect(() => {
    if (!replaceData) return;

    saveSettings(replaceData);
  }, [replaceData]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (callback: (sceneData: SceneJSON) => void) => {
    if (!assets) return;

    const em = ECS.instance.entityManager;
    const entities = structuredClone(
      snapshot(em.getScene().entities),
    ) as EntityToComponent;

    for (const entity of Object.keys(entities)) {
      if (em.has(External, entity)) {
        const parent = em.getComponent(Parent, entity)?.entity;

        if (!parent) return;

        delete entities[parent]?.['Children'];
        delete entities[entity];
      }
    }
    const sceneData: SceneJSON = {
      camera: [camera.position.x, camera.position.y, camera.position.z],
      entities,
      root: em.getScene().root,
    };
    callback(sceneData);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setDir(event.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();

        console.log('name:', scenes[em.currentScene]?.name);
        // if new scene, open dialog. save otherwise
        if (!scenes[em.currentScene]?.name) {
          setOpen(true);
        } else {
          handleSave((sceneData) => {
            const em = ECS.instance.entityManager;
            const file = new File(
              [JSON.stringify(sceneData)],
              scenes[em.currentScene]?.name?.replace('.scene', '') + '.scene',
            );
            const id = scenes[em.currentScene]?.id;
            const directoryId = scenes[em.currentScene]?.directoryId;
            if (id && directoryId) replace({ file, id, directoryId });
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scenes, handleSave, replace]);

  return (
    <>
      <NavigationItem label="File">
        <MenuItem onClick={() => filePickerRef.current[0]?.click()}>
          Open...
        </MenuItem>
        <MenuItem onClick={() => filePickerRef.current[1]?.click()}>
          Import...
        </MenuItem>
      </NavigationItem>
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
          <Button
            onClick={() => {
              handleSave((sceneData) => {
                const file = new File(
                  [JSON.stringify(sceneData)],
                  name.replace('.scene', '') + '.scene',
                );
                console.log('dir:', dir);
                upload({ file, directoryId: dir });
                setOpen(false);
              });
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FileNavigationItem;
