import IProject from "../../interface/IProject";
import projectData from '../data/project.json';
import Model from "./model";

class ProjectModel extends Model
{
  data()
  {
    return projectData as IProject[];
  }
}

export default ProjectModel;
