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
  const [, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const editProject = useEditProject();

  const redirect = (uuid: string) => {
    navigate(`/editor/${uuid}`);
  };

  const deleteProject = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleEditOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
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
      <img
        src={thumbnail}
        alt="box"
        style={{ width: '100%', height: 194, objectFit: 'cover' }}
      />
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
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 8,
              width: 480,
              maxWidth: '90%',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              padding: 16,
            }}
          >
            <h2 style={{ marginTop: 0 }}>Edit project</h2>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label
                  htmlFor="edit-name"
                  style={{ display: 'block', marginBottom: 6 }}
                >
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
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label
                  htmlFor="edit-description"
                  style={{ display: 'block', marginBottom: 6 }}
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  onClick={handleEditClose}
                  disabled={editProject.status === 'pending'}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editProject.status === 'pending'}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 4,
                    border: 'none',
                    background: '#1976d2',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
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
