import React from 'react';
import Modal from './ManageProjectModal';

type DeleteProjectModalProps = {
  open: boolean;
  onClose: () => void;
  projectName: string;
  onConfirm: (e?: React.MouseEvent<HTMLElement>) => void;
  deleting?: boolean;
};

export default function DeleteProjectModal({
  open,
  onClose,
  projectName,
  onConfirm,
  deleting = false,
}: DeleteProjectModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Delete project">
      <p>
        Are you sure you want to delete "{projectName}"? This action cannot be
        undone.
      </p>
      <div className="modal-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          disabled={deleting}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onConfirm}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
}
