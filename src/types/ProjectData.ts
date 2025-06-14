import AddProjectData from './AddProjectData';

export default interface ProjectData extends AddProjectData {
  id: string;
  lastUpdate: string;
}
