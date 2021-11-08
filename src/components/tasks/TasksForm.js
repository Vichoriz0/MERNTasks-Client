import React, { useContext, useState, useEffect } from 'react';

/* Context */
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const TasksForm = () => {

    // State para el registro del input
    const [ task, setTask ] = useState({});

    // Obtener valores de los context
    const projCx = useContext(ProjectContext);
    const { project } = projCx;

    const taskCx = useContext(TaskContext);
    const { currentTask, formError, addTask, getTasks, editTask, showError } = taskCx;

    // Detecta si hay alguna tarea seleccionada
    useEffect(() => {
        if( currentTask !== null ) 
            setTask(currentTask);
        else 
            setTask({ name: '' });
    }, [currentTask]);

    // Si no hay proyecto seleccionado
    if( !project ) return null;

    // Extraer nombre del state para el input
    const { name } = task;

    // Actualizar state a medida que el usuario escribe
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    }

    // Agregar una tarea al proyecto
    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if( name.trim() === '' ) {
            showError();
            return;
        }

        // Agregar al context o editar
        if( currentTask ) {
            editTask(task);
            getTasks(project._id);
        } else {
            addTask(task, project._id);
            getTasks(project._id);

            // Reiniciar formulario
            setTask({ name: '' });
        }
    };

    return (
        <div className="formulario">
            <form onSubmit={ handleSubmit }>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        value={ name }
                        onChange={ handleChange }
                        name="name"
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={ currentTask ? 'Editar Tarea' : 'Agregar Tarea' }
                    />
                </div>
            </form>

            { formError ? <p className="mensaje error">Debe agregar un nombre a la tarea</p> : null }
        </div>
    );
}
 
export default TasksForm;