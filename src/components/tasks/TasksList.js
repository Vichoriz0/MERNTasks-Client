import React, { Fragment, useContext } from 'react';

/* Context */
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

/* Components */
import Task from './Task';

const TasksList = () => {

    // Obtener el state del formulario
    const projCx = useContext(ProjectContext);
    const { project, removeProject } = projCx;

    const taskCx = useContext(TaskContext);
    const { currentTasks, removeTasks } = taskCx;

    // Si no hay proyecto seleccionado
    if( !project ) return <h2>Selecciona un proyecto</h2>;

    // Extraer valores del proyecto
    const { name } = project;

    // Eliminar un proyecto y sus tareas
    const removeProjectAndTasks = projectId => {
        removeProject(projectId);
        removeTasks(projectId);
    };

    return (
        <Fragment>
            <h2>Proyecto: { name }</h2>

            <ul className="listado-tareas">
                { !currentTasks || currentTasks.length === 0 
                    ? (<li className="tarea"> <p>No hay tareas</p> </li>) 
                    : (currentTasks.map( task => (
                        <Task
                            key={ task._id }
                            task={ task } 
                        />
                    )))
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={ () => removeProjectAndTasks(project._id) }
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default TasksList;