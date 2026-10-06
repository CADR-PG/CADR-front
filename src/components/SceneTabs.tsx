import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { ECS } from '@/engine/ECS';
import { useEditorContext } from '@/hooks/useEditorContext';
import useEntityManager from '@/hooks/useEntityManager';

export default function SceneTabs() {
  const { scenes, removeScene } = useEditorSettingsStore();
  const { focus, camera } = useEditorContext();
  const em = useEntityManager();

  const handleAdd = () => {
    ECS.instance.entityManager.createScene();
    console.log('scenes:', ECS.instance.entityManager.scenes);
  };

  const handleClose = (index: number) => {
    const em = ECS.instance.entityManager;
    em.scenes.splice(index, 1);
    removeScene(index);

    if (em.scenes.length === 0) {
      em.createScene();
    }

    let next = em.currentScene;
    if (
      index < em.currentScene ||
      (index === em.currentScene && em.currentScene > 0)
    ) {
      next = em.currentScene - 1;
    }
    next = Math.min(next, em.scenes.length - 1);
    console.log('Scenes:', em.scenes, 'index:', next);
    em.currentScene = next;
    focus(null);
  };

  const handleClick = (index: number) => {
    ECS.instance.entityManager.getScene().lastCameraPosition = [
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ];
    ECS.instance.entityManager.currentScene = index;
    focus(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      {scenes.map((s, i) => (
        <div key={i}>
          <span onClick={() => handleClick(i)}>
            {em.currentScene === i ? '>' : ''} {s?.name ?? `New scene`}
          </span>
          <IconButton onClick={() => handleClose(i)}>
            <CloseIcon />
          </IconButton>
        </div>
      ))}
      <IconButton onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </div>
  );
}
