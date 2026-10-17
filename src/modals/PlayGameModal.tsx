import Modal from './ManageProjectModal';
import { PlayGameReadModel } from '../types/Shop';

type PlayGameModalProps = {
  title: string;
  session: PlayGameReadModel | null;
  onClose: () => void;
};

export default function PlayGameModal({
  title,
  session,
  onClose,
}: PlayGameModalProps) {
  if (!session) return null;

  return (
    <Modal open={!!session} onClose={onClose} title={title}>
      <p className="play-assets__expires">
        {'Links expire: ' + new Date(session.expiresOn).toLocaleString('en-GB')}
      </p>
      {session.assets.length === 0 ? (
        <p className="play-assets__empty">This version has no assets</p>
      ) : (
        <ul className="play-assets">
          {session.assets.map((asset) => (
            <li key={asset.path} className="play-assets__item">
              <span className="play-assets__path">{asset.path}</span>
              <a
                href={asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-small"
              >
                Open
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
