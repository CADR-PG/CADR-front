import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProjectData from '../types/ProjectData';
import thumbnail from '../assets/thumbnail.jpg';
import useEditProject from '../hooks/useEditProject';

interface ProjectCardProps {
  project: ProjectData;
}

function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const editProject = useEditProject();

  const redirect = (uuid: string) => {
    navigate(`/editor/${uuid}`);
  };

  const deleteProject = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setEditOpen(false);
  };

  const handleEditOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setName(project.name);
    setDescription(project.description || '');
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: String(name || '').trim(),
      description: String(description || '').trim(),
    };
    if (!data.name) return;
    editProject.mutate(
      { uuid: project.id, data },
      {
        onSuccess: () => {
          setEditOpen(false);
        },
      },
    );
  };

  return (
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
              deleteProject(e);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {editOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal-overlay"
          onClick={handleEditClose}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Edit project</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-row">
                <label htmlFor="edit-name" className="form-label">
                  Name
                </label>
                <input
                  id="edit-name"
                  name="edit-name"
                  required
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
              <div className="form-row">
                <label htmlFor="edit-description" className="form-label">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="textarea"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={handleEditClose}
                  disabled={editProject.status === 'pending'}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editProject.status === 'pending'}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
