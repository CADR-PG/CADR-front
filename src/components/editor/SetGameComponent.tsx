import useEntityManager from '@/hooks/useEntityManager';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function SetGameComponent() {
  const em = useEntityManager();
  const { scenes, game, setGame } = useEditorSettingsStore();

  return (
    <div>
      <FormControlLabel
        label="Main"
        control={
          <Checkbox
            checked={scenes[em.currentScene]?.id === game}
            onChange={(e) => {
              console.log('checked');
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
