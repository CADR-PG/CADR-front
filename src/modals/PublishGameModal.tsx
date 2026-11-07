import { useState } from 'react';
import Modal from './ManageProjectModal';
import ProjectData from '../types/ProjectData';
import { GameStates } from '../types/Shop';
import useAddGameToStore from '../hooks/useAddGameToStore';
import useCreateSnapshot from '../hooks/useCreateSnapshot';
import usePublishVersion from '../hooks/usePublishVersion';
import useLoadScene from '../hooks/useLoadScene';
import { getPublishedGame, PublishedGame } from '../utils/publishedGames';
import { useEditorSettingsStore } from '../stores/editorSettingsStore';
import { useEditorStore } from '../stores/editorStore';

type PublishGameModalProps = {
  open: boolean;
  onClose: () => void;
  project: ProjectData;
};

export default function PublishGameModal({
  open,
  onClose,
  project,
}: PublishGameModalProps) {
  const [published, setPublished] = useState<PublishedGame | null>(() =>
    getPublishedGame(project.id),
  );
  const addGame = useAddGameToStore();
  const createSnapshot = useCreateSnapshot();
  const publishVersion = usePublishVersion();
  const editorProjectId = useEditorStore((s) => s.projectId);
  const editorMainScene = useEditorSettingsStore((s) => s.game);
  const inEditor = editorProjectId === project.id;
  const { data: savedProject } = useLoadScene(project.id, !inEditor);
  const mainSceneFileId = inEditor
    ? editorMainScene
    : (savedProject?.data.data.game ?? null);
  const pending =
    addGame.status === 'pending' ||
    createSnapshot.status === 'pending' ||
    publishVersion.status === 'pending';
  const missingMainScene = !mainSceneFileId && (inEditor || !!savedProject);
  const mainSceneWarning = missingMainScene ? (
    <p className="modal-warning">
      Set a main scene in the editor (the &quot;Main&quot; checkbox) and save
      the project before publishing.
    </p>
  ) : null;

  const refresh = () => setPublished(getPublishedGame(project.id));

  const handleAddGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get('title') || '').trim();
    if (!title || !mainSceneFileId) return;

    addGame.mutate(
      {
        projectId: project.id,
        data: {
          title,
          description: String(data.get('description') || '').trim(),
          version: String(data.get('version') || '').trim(),
          amount: Number(data.get('amount') || 0),
          ageRestriction: Number(data.get('ageRestriction') || 0),
          state: String(data.get('state')) as GameStates,
          mainSceneFileId,
        },
      },
      { onSuccess: refresh },
    );
  };

  const handleCreateSnapshot = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!published || !mainSceneFileId) return;
    const form = event.currentTarget;
    const version = String(new FormData(form).get('version') || '').trim();
    if (!version) return;

    createSnapshot.mutate(
      {
        projectId: project.id,
        data: { gameId: published.gameId, version, mainSceneFileId },
      },
      {
        onSuccess: () => {
          form.reset();
          refresh();
        },
      },
    );
  };

  const handlePublishVersion = () => {
    if (!published?.lastVersionId) return;
    publishVersion.mutate({
      gameId: published.gameId,
      gameVersionId: published.lastVersionId,
    });
  };

  if (!published) {
    return (
      <Modal open={open} onClose={onClose} title="Publish to store">
        <form onSubmit={handleAddGame}>
          <div className="form-row">
            <label htmlFor={`title-${project.id}`} className="form-label">
              Title
            </label>
            <input
              id={`title-${project.id}`}
              name="title"
              defaultValue={project.name}
              className="input"
              type="text"
              required
              autoFocus
            />
          </div>
          <div className="form-row">
            <label htmlFor={`gdesc-${project.id}`} className="form-label">
              Description
            </label>
            <input
              id={`gdesc-${project.id}`}
              name="description"
              defaultValue={project.description || ''}
              className="input"
              type="text"
              required
            />
          </div>
          <div className="form-row form-row--split">
            <div>
              <label htmlFor={`version-${project.id}`} className="form-label">
                Version
              </label>
              <input
                id={`version-${project.id}`}
                name="version"
                defaultValue="1.0.0"
                className="input"
                type="text"
                required
              />
            </div>
            <div>
              <label htmlFor={`amount-${project.id}`} className="form-label">
                Price (PLN)
              </label>
              <input
                id={`amount-${project.id}`}
                name="amount"
                defaultValue={0}
                min={0}
                step={0.01}
                className="input"
                type="number"
                required
              />
            </div>
          </div>
          <div className="form-row form-row--split">
            <div>
              <label htmlFor={`age-${project.id}`} className="form-label">
                Age restriction
              </label>
              <input
                id={`age-${project.id}`}
                name="ageRestriction"
                defaultValue={0}
                min={0}
                max={21}
                className="input"
                type="number"
                required
              />
            </div>
            <div>
              <label htmlFor={`state-${project.id}`} className="form-label">
                State
              </label>
              <select
                id={`state-${project.id}`}
                name="state"
                defaultValue="Published"
                className="input"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
          {mainSceneWarning}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pending || !mainSceneFileId}
            >
              {pending ? 'Publishing...' : 'Add to store'}
            </button>
          </div>
        </form>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title="Manage store game">
      <div className="buy-summary">
        <div className="buy-summary__row">
          <span>Game</span>
          <strong>{published.title || project.name}</strong>
        </div>
        <div className="buy-summary__row">
          <span>Latest version</span>
          <strong>{published.lastVersion || 'Initial'}</strong>
        </div>
      </div>

      <form onSubmit={handleCreateSnapshot}>
        <div className="form-row">
          <label htmlFor={`new-version-${project.id}`} className="form-label">
            New version
          </label>
          <input
            id={`new-version-${project.id}`}
            name="version"
            placeholder="e.g. 1.1.0"
            className="input"
            type="text"
            required
          />
        </div>
        {mainSceneWarning}
        <div className="modal-actions">
          <button
            type="submit"
            className="btn-small"
            disabled={pending || !mainSceneFileId}
          >
            Create snapshot
          </button>
          <button
            type="button"
            className="btn-small"
            onClick={handlePublishVersion}
            disabled={pending || !published.lastVersionId}
          >
            Publish latest version
          </button>
        </div>
      </form>

      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
