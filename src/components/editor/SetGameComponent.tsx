import useEntityManager from '@/hooks/useEntityManager';
import useSaveScene from '@/hooks/useSaveScene';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function SetGameComponent() {
  const em = useEntityManager();
  const { uuid } = useParams();
  const { mutate: saveScene } = useSaveScene();
  const { scenes, game, setGame } = useEditorSettingsStore();
  const currentId = scenes[em.currentScene]?.id ?? null;

  const handleChange = (checked: boolean) => {
    const newGame = checked ? currentId : null;
    setGame(newGame);
    saveScene({
      id: uuid ?? '',
      data: { currentScene: em.currentScene, scenes, game: newGame },
    });
  };

  return (
    <Tooltip
      title={currentId ? '' : 'Save the scene first (File > Save scene)'}
    >
      <span>
        <FormControlLabel
          label="Main scene"
          disabled={!currentId}
          control={
            <Checkbox
              checked={!!currentId && currentId === game}
              onChange={(e) => handleChange(e.target.checked)}
            />
          }
        />
      </span>
    </Tooltip>
    <div>
      <FormControlLabel
        label="Main"
        control={
          <Checkbox
            checked={scenes[em.currentScene]?.id === game && game !== null}
            onChange={(e) => {
              if (e.target.checked && scenes[em.currentScene]) {
                setGame(scenes[em.currentScene]!.id);
              } else {
                setGame(null);
              }
            }}
          />
        }
      />
    </div>
  );
}
