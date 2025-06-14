import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProjectData from '../types/ProjectData';
import thumbnail from '../assets/thumbnail.jpg';

interface ProjectCardProps {
  project: ProjectData;
}

function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    <Card className="dashboard-item" key={project.id}>
      <CardActionArea onClick={() => redirect(project.id)}>
        <CardMedia component="img" height="194" image={thumbnail} alt="box" />
        <CardHeader
          title={project.name}
          subheader={
            'Modified: ' +
            new Date(project.lastUpdate).toLocaleDateString('en-GB')
          }
          action={
            <>
              <div onClick={handleMenuOpen}>
                <MoreVertIcon />
              </div>
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
                <MenuItem sx={{ color: 'error.main' }} onClick={deleteProject}>
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
        />
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;
