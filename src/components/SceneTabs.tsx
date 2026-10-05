import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { ECS } from '@/engine/ECS';
import { useEditorContext } from '@/hooks/useEditorContext';

export default function SceneTabs() {
  const { scenes, pushScene, removeScene, setScene, scene } =
    useEditorSettingsStore();
  const { focus } = useEditorContext();

  const handleAdd = () => {
    pushScene({ id: null, name: null, directory: null });
    ECS.instance.entityManager.scenes.push({
      entities: {},
      entitiesCopy: {},
      dirty: false,
    });
    console.log('scenes:', ECS.instance.entityManager.scenes);
  };

  const handleClose = (index: number) => {
    removeScene(index);
    ECS.instance.entityManager.scenes.splice(index, 1);

    if (scene === index) {
      setScene(scene - 1);
      if (scene === -1) {
        pushScene({ id: null, name: null, directory: null });
        ECS.instance.entityManager.scenes.push({
          entities: {},
          entitiesCopy: {},
          dirty: false,
        });
      }
    }
  };

  const handleClick = (index: number) => {
    console.log('uhh');
    setScene(index);
    focus(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      {scenes.map((s, i) => (
        <div>
          <span onClick={() => handleClick(i)}>
            {scene === i ? '>' : ''} {s?.name ?? `New scene`}
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
