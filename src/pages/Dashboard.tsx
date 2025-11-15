import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import useGetProjects from '../hooks/useGetProjects';
import { useState } from 'react';
import useAddProject from '../hooks/useAddProject';
import AddProjectData from '../types/AddProjectData';
import AddIcon from '@mui/icons-material/Add';
import NavBar from '../components/NavBar';
import useAuth from '../hooks/useAuth';
import ProjectCard from '../components/ProjectCard';
import ProjectData from '../types/ProjectData';

function Dashboard() {
  useAuth();
  const getProjects = useGetProjects();
  const [open, setOpen] = useState(false);
  const addProject = useAddProject();

  const [query, setQuery] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <NavBar />
      <section className="l-section l-section--dashboard">
        <div className="dashboard-hld">
          <h1>Twoje sceny</h1>
          <div className="dashboard-panel">
            <input
              type="text"
              className="search-bar"
              placeholder="Search scene..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn-primary" onClick={handleOpen}>
              <AddIcon /> Nowa scena
            </button>
          </div>
        </div>
        <div className="dashboard-projects">
          {getProjects.isSuccess &&
            (() => {
              const items: ProjectData[] = getProjects.data?.data.items || [];
              const q = query.trim().toLowerCase();
              const filtered = items.filter((p) =>
                q === '' ? true : (p.name || '').toLowerCase().includes(q),
              );
              return filtered
                .sort(
                  (a: ProjectData, b: ProjectData) =>
                    new Date(b.lastUpdate).getTime() -
                    new Date(a.lastUpdate).getTime(),
                )
                .slice(0, 6)
                .map((project: ProjectData) => (
                  <ProjectCard project={project} key={project.id} />
                ));
            })()}

          <div
            className="dashboard-item-add dashboard-item"
            onClick={handleOpen}
            role="button"
          >
            Create new project
          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formObject = Object.fromEntries(formData.entries());
                const data: AddProjectData = {
                  name: String(formObject.name || '').trim(),
                  description: String(formObject.description || '').trim(),
                };
                if (!data.name) return;
                addProject.mutate(data);
              },
            },
          }}
        >
          <DialogContent>
            <DialogTitle>Create new project</DialogTitle>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              disabled={addProject.status === 'pending'}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={addProject.status === 'pending'}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </div>
  );
}

export default Dashboard;
