import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import useGetProjects from '../hooks/useGetProjects';
import { useState } from 'react';
import useAddProject from '../hooks/useAddProject';
import AddProjectData from '../types/AddProjectData';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import NavBar from '../components/NavBar';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface ProjectData extends AddProjectData {
  id: string;
  lastUpdate: string;
}

function Dashboard() {
  useAuth();
  const getProjects = useGetProjects();
  const [open, setOpen] = useState(false);
  const addProject = useAddProject();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  console.log(getProjects.data?.data.items);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const redirect = (uuid: string) => {
    navigate(`/editor/${uuid}`);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const deleteProject = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const modifyProject = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <NavBar />
      <div className="dashboard-hld">
        <h1>Dashboard</h1>
        <hr className="dashboard-separator" />
        <h2>Recent</h2>
        <div className="dashboard-projects">
          {getProjects.isSuccess &&
            getProjects.data?.data.items
              // TODO: ja pierdole xd
              .sort(
                (a: ProjectData, b: ProjectData) =>
                  new Date(b.lastUpdate).getTime() -
                  new Date(a.lastUpdate).getTime(),
              )
              .slice(0, 5)
              .map((project: ProjectData) => (
                <Card className="dashboard-item" key={project.id}>
                  <CardActionArea onClick={() => redirect(project.id)}>
                    <CardHeader
                      title={project.name}
                      subheader={
                        'Modified: ' +
                        new Date(project.lastUpdate).toLocaleDateString('en-GB')
                      }
                      action={
                        <>
                          <IconButton
                            aria-label="settings"
                            onClick={handleMenuOpen}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={anchorEl != null}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            <MenuItem onClick={modifyProject}>Modify</MenuItem>
                            <MenuItem
                              sx={{ color: 'error.main' }}
                              onClick={deleteProject}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </>
                      }
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image="/src/assets/thumbnail.jpg"
                      alt="box"
                    />
                  </CardActionArea>
                </Card>
              ))}
          <Card className="dashboard-new">
            <CardActionArea className="dashboard-action" onClick={handleOpen}>
              <div className="dashboard-area">
                <AddIcon />
                <p>Create</p>
              </div>
            </CardActionArea>
          </Card>
        </div>
        <hr className="dashboard-separator" />
        <h2>Projects</h2>
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
