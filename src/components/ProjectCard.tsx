import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProjectData from '../types/ProjectData';
import thumbnail from '../assets/thumbnail.jpg';
import useEditProject from '../hooks/useEditProject';
import Modal from '../modals/ManageProjectModal';
import DeleteProjectModal from '../modals/DeleteProjectModal';
import { deleteProject as apiDeleteProject } from '../api/client';

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const editProject = useEditProject();

  const redirect = (uuid: string) => {
    navigate(`/editor/${uuid}`);
  };

  const handleEditOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const description = String(data.get('description') || '').trim();

    if (!name) return;
    editProject.mutate(
      { uuid: project.id, data: { name, description } },
      {
        onSuccess: () => {
          setEditOpen(false);
        },
      },
    );
  };

  // Delete handlers
  const handleDeleteOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async (e?: React.MouseEvent<HTMLElement>) => {
    if (e) e.stopPropagation();
    setDeleting(true);
    try {
      await apiDeleteProject(project.id);
      setDeleting(false);
      setDeleteOpen(false);
      // Proste odświeżenie listy po usunięciu. Można zastąpić callbackiem z rodzica.
      window.location.reload();
    } catch (err) {
      setDeleting(false);
      console.error(err);
      alert('Nie udało się usunąć projektu.');
    }
  };

  return (
    <>
      <div className="dashboard-item">
        <img src={thumbnail} alt="box" className="project-thumbnail" />
        <div className="scene-content">
          <div className="scene-info">
            <h3>{project.name}</h3>
            <p>
              {'Modified: ' +
                new Date(project.lastUpdate).toLocaleDateString('en-GB')}
            </p>
          </div>
          <div className="scene-actions">
            <button
              className="btn-small"
              onClick={(e) => {
                e.stopPropagation();
                redirect(project.id);
              }}
            >
              Open
            </button>
            <button
              className="btn-small"
              onClick={(e) => {
                e.stopPropagation();
                handleEditOpen(e);
              }}
            >
              Edit
            </button>
            <button
              className="btn-small"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteOpen(e);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* edit modal (pozostaje bez zmian) */}
      <Modal open={editOpen} onClose={handleEditClose} title="Edit scene">
        <form onSubmit={handleEditSubmit}>
          <div className="form-row">
            <label htmlFor={`name-${project.id}`} className="form-label">
              Name
            </label>
            <input
              id={`name-${project.id}`}
              name="name"
              defaultValue={project.name}
              className="input"
              type="text"
              required
              autoFocus
            />
          </div>
          <div className="form-row">
            <label htmlFor={`desc-${project.id}`} className="form-label">
              Description
            </label>
            <input
              id={`desc-${project.id}`}
              name="description"
              defaultValue={project.description || ''}
              className="input"
              type="text"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleEditClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* zmienione — użycie nowego komponentu potwierdzającego usunięcie */}
      <DeleteProjectModal
        open={deleteOpen}
        onClose={handleDeleteClose}
        projectName={project.name}
        onConfirm={handleDeleteConfirm}
        deleting={deleting}
      />
    </>
  );
}
