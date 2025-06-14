import {
  Button,
  Card,
  CardActionArea,
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavBar />
      <div className="dashboard-hld">
        <h1>Dashboard</h1>
        <hr className="dashboard-separator" />
        <h2>Recent</h2>
        <div className="dashboard-projects">
          <Card className="dashboard-new">
            <CardActionArea className="dashboard-action" onClick={handleOpen}>
              <div className="dashboard-area">
                <AddIcon />
                <p>Create</p>
              </div>
            </CardActionArea>
          </Card>
          {getProjects.isSuccess &&
            getProjects.data?.data.items
              // TODO: ja pierdole xd
              .sort(
                (a: ProjectData, b: ProjectData) =>
                  new Date(b.lastUpdate).getTime() -
                  new Date(a.lastUpdate).getTime(),
              )
              .slice(0, 6)
              .map((project: ProjectData) => (
                <ProjectCard project={project} key={project.id} />
              ))}
        </div>
        <hr className="dashboard-separator" />
        <h2>Projects</h2>
        <div className="dashboard-projects">
          {getProjects.isSuccess &&
            getProjects.data?.data.items
              // TODO: ja pierdole xd
              .sort(
                (a: ProjectData, b: ProjectData) =>
                  new Date(b.lastUpdate).getTime() -
                  new Date(a.lastUpdate).getTime(),
              )
              .slice(5)
              .map((project: ProjectData) => (
                <ProjectCard project={project} key={project.id} />
              ))}
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
                  name: formObject.name.toString(),
                  description: formObject.description.toString(),
                };
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
              autoFocus
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Dashboard;
