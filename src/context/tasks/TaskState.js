import React, { useReducer } from 'react';
import axiosClt from '../../config/axios';

/* Context & Reducer */
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';

/* Types */
import {
    PROJECT_TASKS,
    ADD_TASK,
    VALIDATE_TASK_FORM,
    REMOVE_TASK,
    EDIT_TASK,
    CURRENT_TASK,
    REMOVE_PROJECT_TASKS,
    RESET_TASKS_STATE
} from '../../types';

const TaskState = props => {
    const initialState = {
        formError: false,
        currentTasks: [],
        currentTask: null
    };

    // Obtener dispatch y state
    const [ state, dispatch ] = useReducer(TaskReducer, initialState);

    // Obtener tareas de un proyecto en específico
    const getTasks = async projectId => {
        try {
            const response = await axiosClt.get('/api/tasks', { params: {projectId} });
            
            dispatch({
                type: PROJECT_TASKS,
                payload: response.data.tasks
            });
        } catch(err) {
            console.error(err);
        }
    };

    // Agregar una nueva tarea
    const addTask = async (task, projectId) => {
        task.projectId = projectId;

        try {
            const response = await axiosClt.post('/api/tasks', task);

            dispatch({
                type: ADD_TASK,
                payload: response.data.task
            });
        } catch(err) {
            console.error(err);
        }
    };

    // Muestra un error
    const showError = () => {
        dispatch({
            type: VALIDATE_TASK_FORM
        });
    }

    // Eliminar una tarea por ID
    const removeTask = async (_id, projectId) => {
        try {
            await axiosClt.delete(`/api/tasks/${_id}`, { params: {projectId} });

            dispatch({
                type: REMOVE_TASK,
                payload: _id
            });
        } catch(err) {
            console.error(err);
        }
    };

    // Eliminar todas las tareas de un proyecto
    const removeTasks = async projectId => {
        try {
            await axiosClt.delete('/api/tasks', { params: {projectId} });

            dispatch({
                type: REMOVE_PROJECT_TASKS,
                payload: projectId
            });
        } catch(err) {
            console.error(err);
        }
    }

    // Editar una tarea
    const editTask = async task => {
        try {
            await axiosClt.put(`/api/tasks/${task._id}`, task);

            dispatch({
                type: EDIT_TASK,
                payload: task
            });
        } catch(err) {
            console.error(err);
        }
    };

    // Extraer una tarea para su edición
    const setCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        });
    };

    // Volver el state a sus valores iniciales
    const resetTaskState = () => {
        dispatch({
            type: RESET_TASKS_STATE,
            payload: initialState
        });
    };

    return (
        <TaskContext.Provider
            value={{
                currentTasks: state.currentTasks,
                currentTask: state.currentTask,
                formError: state.formError,
                getTasks,
                addTask,
                showError,
                removeTask,
                removeTasks,
                editTask,
                setCurrentTask,
                resetTaskState
            }}
        >
            { props.children }
        </TaskContext.Provider>
    );
};

export default TaskState;