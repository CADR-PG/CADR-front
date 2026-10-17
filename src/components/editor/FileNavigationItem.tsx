import { MenuItem } from '@mui/material';
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
import useGetProjects from '../../hooks/useGetProjects';
import PublishGameModal from '../../modals/PublishGameModal';
import ProjectData from '../../types/ProjectData';

function FileNavigationItem() {
  const em = useEntityManager();
  const { focus } = useEditorContext();
  const { mutate } = useSaveScene();
  const { uuid } = useParams();
  const filePickerRef = useRef<(HTMLInputElement | null)[]>([]);
  const { openSnackbar } = useSnackbarStore();

  const [secondsLeft, setSecondsLeft] = useState(60);
  const [publishOpen, setPublishOpen] = useState(false);
  const getProjects = useGetProjects();

  const project: ProjectData = getProjects.data?.data.items.find(
    (p: ProjectData) => p.id === uuid,
  ) ?? { id: uuid ?? '', name: '', description: '', lastUpdate: '' };

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
        <MenuItem
          onClick={() => {
            saveScene();
            focus(null);
            setPublishOpen(true);
          }}
        >
          Publish...
        </MenuItem>
        <MenuItem disabled>Autosave in: {secondsLeft}s</MenuItem>
      </NavigationItem>
      <input ref={setRef(0)} type="file" onChange={deserializeScene} hidden />
      {publishOpen && (
        <PublishGameModal
          open={publishOpen}
          onClose={() => setPublishOpen(false)}
          project={project}
        />
      )}
      <SnackbarProvider />
    </>
  );
}

export default FileNavigationItem;
