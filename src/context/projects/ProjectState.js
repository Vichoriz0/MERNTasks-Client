import React, { useReducer } from 'react';
import axiosClt from '../../config/axios';

import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import { 
    FORM_PROJECT, 
    GET_PROJECTS, 
    ADD_PROJECT,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    REMOVE_PROJECT,
    PROJECT_ERROR,
    RESET_PROJECT_STATE
} from '../../types';

const ProjectState = props => {
    const initialState = {
        projects: [],
        project: null,
        form: false,
        formError: false,
        msg: null
    };

    // Dispatch para ejecutar acciones
    const [ state, dispatch ] = useReducer(ProjectReducer, initialState);

    // Funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        });
    };

    // Obtener los proyectos
    const getProjects = async () => {
        try {
            const response = await axiosClt.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            });
        } catch(err) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    // Agregar nuevo proyecto
    const addProject = async project => {
        try {
            const response = await axiosClt.post('/api/projects', project);

            dispatch({
                type: ADD_PROJECT,
                payload: response.data.project
            }); 
        } catch(err) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    // Validar que el formulario no tenga errores
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        });
    };

    // Selecciona el proyecto en que el usuario dio click
    const selectCurrentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        });
    };

    // Eliminar un proyecto
    const removeProject = async projectId => {
        try {
            await axiosClt.delete(`/api/projects/${projectId}`);

            dispatch({
                type: REMOVE_PROJECT,
                payload: projectId
            });
        } catch(err) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    // Volver el state a sus valores iniciales
    const resetProjectState = () => {
        dispatch({
            type: RESET_PROJECT_STATE,
            payload: initialState
        });
    }

    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                project: state.project,
                form: state.form,
                formError: state.formError,
                msg: state.msg,
                showForm,
                getProjects,
                addProject,
                showError,
                selectCurrentProject,
                removeProject,
                resetProjectState
            }}
        >
            { props.children }
        </ProjectContext.Provider>
    );
}

export default ProjectState;