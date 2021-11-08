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

const ProjectReducer = ( state, action ) => {
    switch(action.type) {
        case FORM_PROJECT:
            return {
                ...state,
                form: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                project: action.payload,
                form: false,
                formError: false
            }
        case VALIDATE_FORM:
            return {
                ...state,
                formError: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projects.find(proj => proj._id === action.payload)
            }
        case REMOVE_PROJECT:
            return {
                ...state,
                project: null,
                projects: state.projects.filter(proj => proj._id !== action.payload)
            }
        case PROJECT_ERROR:
            return {
                ...state,
                msg: action.payload
            };
        case RESET_PROJECT_STATE:
            return {
                projects: action.payload.projects,
                project: action.payload.project,
                form: action.payload.form,
                formError: action.payload.formError,
                msg: action.payload.msg
            };
        default:
            return state;
    }
};

export default ProjectReducer;