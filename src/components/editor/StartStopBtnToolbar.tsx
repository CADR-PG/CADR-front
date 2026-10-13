import { useEditorContext } from '../../hooks/useEditorContext';
import { IconButton } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { ECS } from '@/engine/ECS';
import { useParams } from 'react-router-dom';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { loadScene } from '@/engine/Scene';

function StartStopBtnToolbar() {
  const { running, setRunning, focus } = useEditorContext();
  const { uuid } = useParams();
  const { scenes } = useEditorSettingsStore();

  return (
    <div>
      <IconButton
        disabled={running}
        onClick={() => {
          const em = ECS.instance.entityManager;
          const scene = scenes[em.currentScene];
          if (!running && scene) {
            loadScene(
              uuid!,
              {
                id: scene.id ?? '',
                name: scene.name ?? '',
                directoryId: scene.directoryId ?? '',
              },
              -1,
            );
          }

          const temp = em.currentScene;
          em.currentScene = em.savedScene;
          em.savedScene = temp;

          setRunning(!running);

          focus(null);
        }}
      >
        <OndemandVideoIcon />
      </IconButton>
    </div>
  );
}

export default StartStopBtnToolbar;
