import { Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, Menu, TextField, Typography } from "@mui/material";
import useGetProjects from "../hooks/useGetProjects";
import { useEffect, useState } from "react";
import useAddProject from "../hooks/useAddProject";
import AddProjectData from "../types/AddProjectData";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
  }

  const handleClose = () => {
    setOpen(false);
  }

  const redirect = (uuid: string) => {
    navigate(`/editor/${uuid}`);
  }

  return (
    <div className='dashboard-hld'>
      <NavBar />
      <h1>Dashboard</h1>
      <div className='dashboard-projects'>
        {getProjects.isSuccess && getProjects.data?.data.items.map((project: ProjectData) => (
          <Card key={project.id}>
            <CardActionArea onClick={() => redirect(project.id)}>
              <CardHeader
                title={project.name}
                subheader={"Modified: " + new Date(project.lastUpdate).toLocaleDateString('en-GB')}
                action={
                  <>
                    <IconButton aria-label="settings" onClick={(e) => {
                      e.stopPropagation();
                      console.log("icon");
                    }}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl != null}
                    />
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
        <Card>
          <Button onClick={handleOpen}>Create new project</Button>
        </Card>
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
              // handleClose();
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
  );
}

export default Dashboard;
