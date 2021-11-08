import React, { useContext } from 'react';

/* Context */
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const Project = ({ project }) => {

    // Obtener valores de los context
    const projCx = useContext(ProjectContext);
    const { selectCurrentProject } = projCx;

    const taskCx = useContext(TaskContext);
    const { getTasks } = taskCx;

    // Extraer valores del proyecto
    const { name } = project;

    // Seleccionar proyecto con sus tareas
    const selectProject = projectId => {
        selectCurrentProject(projectId);
        getTasks(projectId);
    };

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selectProject(project._id) }
            >{ name }</button>
        </li>
    );
}
 
export default Project;