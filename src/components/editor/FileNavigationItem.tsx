import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
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

function FileNavigationItem() {
  const em = useEntityManager();
  const { focus, scene, setScene, scenes, setScenes } = useEditorContext();
  const { mutate } = useSaveScene();
  const { data, mutate: upload } = useUploadFile();
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
    setScene(() => {
      mutate({
        id: uuid ? uuid : '',
        data: {
          currentScene: data.data.id,
          scenes: scenes,
        },
      });
      return data.data.id;
    });
    // setScenes((prev) => [...prev, data.data.id]);
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!assets) return;

    const entities = em.getScene();
    const file = new File([JSON.stringify(entities)], name + '.scene');
    const text = await file.text();

    upload({ file, directoryId: dir });
    setOpen(false);
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
        setOpen(true);
        // saveScene();
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
