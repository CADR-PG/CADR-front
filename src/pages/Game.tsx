import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CanvasController from '../components/editor/CanvasController';
import KeyboardController from '../components/editor/KeyboardController';
import SnackbarProvider from '../components/SnackbarProvider';
import useAuth from '../hooks/useAuth';
import usePlayGame from '../hooks/usePlayGame';
import { useEditorStore } from '../stores/editorStore';
import { useGameAssetsStore } from '../stores/gameAssetsStore';

function Game() {
  useAuth();
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { mutateAsync: playGame } = usePlayGame();
  const setSession = useGameAssetsStore((s) => s.setSession);
  const clearSession = useGameAssetsStore((s) => s.clear);
  const running = useEditorStore((s) => s.running);
  const setRunning = useEditorStore((s) => s.setRunning);
  const reset = useEditorStore((s) => s.reset);
  const [error, setError] = useState<string | null>(null);
  const requested = useRef<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      useEditorStore.getState().setRunning(false, null);
      reset();
      clearSession();
    };
  }, [reset, clearSession]);

  useEffect(() => {
    if (!gameId || requested.current === gameId) return;
    requested.current = gameId;

    async function start() {
      try {
        const response = await playGame(gameId!);
        if (!mounted.current) return;
        if (response.data.assets.length === 0) {
          setError(
            'This game version has no files. Save the main scene as a file in the editor and publish a new version.',
          );
          return;
        }
        setSession(response.data);
        await setRunning(true, false);
        if (!mounted.current) {
          useEditorStore.getState().setRunning(false, null);
          return;
        }
        if (!useEditorStore.getState().running)
          setError("Couldn't load the main scene of this game");
      } catch {
        if (mounted.current) setError('Failed to start the game');
      }
    }
    start();
  }, [gameId, playGame, setSession, setRunning]);

  return (
    <DndProvider backend={HTML5Backend}>
      <KeyboardController>
        <div className="game">
          <div className="game__bar">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Back to store
            </button>
          </div>
          <div className="game__canvas">
            {running ? (
              <CanvasController />
            ) : (
              <div className="game__status">
                {error ?? 'Loading game...'}
              </div>
            )}
          </div>
        </div>
      </KeyboardController>
      <SnackbarProvider />
    </DndProvider>
  );
}

export default Game;
