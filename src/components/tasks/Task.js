import React, { useContext } from 'react';

/* Context */
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const Task = ({ task }) => {

    // Extraer elementos de la tarea
    const { _id, name, state } = task;

    // Extraer elementos del context de tareas
    const projCx = useContext(ProjectContext);
    const { project } = projCx;

    const taskCx = useContext(TaskContext);
    const { getTasks, removeTask, editTask, setCurrentTask } = taskCx;

    // Eliminar una tarea y actualizar lista
    const removeTaskAndUpdate = _id => {
        removeTask(_id, task.projectId);
        getTasks(project._id);
    };

    // Cambiar el estado de la tarea
    const changeTaskState = task => {
        const updatedTask = { ...task, state: !state };
        editTask(updatedTask);
        getTasks(project._id);
    };

    // Habilita la edición de una tarea
    const selectTask = task => {
        setCurrentTask(task);
    };

    return (
        <li className="tarea sombra">
            <p>{ name }</p>

            <div className="estado">
                { state 
                ? (
                    <button
                        type="button"
                        className="completo"
                        onClick={ () => changeTaskState(task) }
                    >Completo</button>
                ) : (
                    <button
                        type="button"
                        className="incompleto"
                        onClick={ () => changeTaskState(task) }
                    >Incompleto</button>
                )}
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => selectTask(task) }
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => removeTaskAndUpdate(_id) }
                >Eliminar</button>
            </div>
        </li>
    );
}
 
export default Task;