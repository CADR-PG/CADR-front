import useGetProjects from '../hooks/useGetProjects';
import { useState } from 'react';
import useAddProject from '../hooks/useAddProject';
import AddProjectData from '../types/AddProjectData';
import NavBar from '../components/NavBar';
import useAuth from '../hooks/useAuth';
import ProjectCard from '../components/ProjectCard';
import ProjectData from '../types/ProjectData';
import { AxiosError } from 'axios';
import ServerError from '../types/ServerError';
import SnackbarProvider from '../components/SnackbarProvider';
import { useSnackbarStore } from '../stores/snackbarStore';
import Modal from '../modals/ManageProjectModal';

function Dashboard() {
  useAuth();
  const getProjects = useGetProjects();
  const [open, setOpen] = useState(false);
  const addProject = useAddProject();
  const { openSnackbar } = useSnackbarStore();

  const [query, setQuery] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    const data: AddProjectData = {
      name: String(formObject.name || '').trim(),
      description: String(formObject.description || '').trim(),
    };
    if (!data.name) return;
    addProject.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: (err: unknown) => {
        const message =
          (err as AxiosError<ServerError>).response?.data.message ||
          'Failed to create project';
        openSnackbar(message, 'error');
      },
    });
  };

  const renderProjects = () => {
    const items: ProjectData[] = getProjects.data?.data.items || [];
    const q = query.trim().toLowerCase();
    const filtered = items.filter((p) =>
      q === '' ? true : (p.name || '').toLowerCase().includes(q),
    );

    if (filtered.length === 0) {
      return <div className="empty-state">You don't have any scenes yet</div>;
    }

    return filtered
      .sort(
        (a: ProjectData, b: ProjectData) =>
          new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime(),
      )
      .slice(0, 6)
      .map((project: ProjectData) => (
        <ProjectCard project={project} key={project.id} />
      ));
  };

  return (
    <div className="container">
      <NavBar />
      <section className="l-section l-section--dashboard">
        <div className="dashboard-hld">
          <h1>Your scenes</h1>
          <div className="dashboard-panel">
            <input
              type="text"
              className="search-bar"
              placeholder="Search scene..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn-primary" onClick={handleOpen}>
              <span className="btn-content">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5v14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                New scene
              </span>
            </button>
          </div>
        </div>
        <div className="dashboard-projects">
          {getProjects.isSuccess && renderProjects()}
        </div>

        <Modal open={open} onClose={handleClose} title="Create new project">
          <form onSubmit={handleCreateProject}>
            <div className="form-row">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoFocus
                type="text"
                className="input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                className="input"
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={handleClose}
                disabled={addProject.status === 'pending'}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addProject.status === 'pending'}
                className="btn btn-primary"
              >
                Create
              </button>
            </div>
          </form>
        </Modal>
      </section>
      <SnackbarProvider />
    </div>
  );
}

export default Dashboard;
