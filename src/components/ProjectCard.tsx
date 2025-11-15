import {
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
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
      <CardMedia component="img" height="194" image={thumbnail} alt="box" />
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
            Otwórz
          </button>
          <button
            className="btn-small"
            onClick={(e) => {
              e.stopPropagation();
              handleEditOpen(e);
            }}
          >
            Edytuj
          </button>
          <button
            className="btn-small"
            onClick={(e) => {
              e.stopPropagation();
              deleteProject(e);
            }}
          >
            Usuń
          </button>
        </div>
      </div>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <form onSubmit={handleEditSubmit}>
          <DialogTitle>Edit project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="edit-name"
              name="edit-name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="edit-description"
              name="edit-description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleEditClose}
              disabled={editProject.status === 'pending'}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={editProject.status === 'pending'}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ProjectCard;
