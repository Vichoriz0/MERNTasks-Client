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

const TaskReducer = ( state, action ) => {
    switch(action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                currentTasks: action.payload
            };
        case ADD_TASK:
            return {
                ...state,
                currentTasks: [ action.payload, ...state.currentTasks ],
                formError: false
            };
        case VALIDATE_TASK_FORM:
            return {
                ...state,
                formError: true
            };
        case REMOVE_TASK:
            return {
                ...state,
                currentTasks: state.currentTasks.filter( task => task._id !== action.payload ),
                currentTask: null
            };
        case REMOVE_PROJECT_TASKS:
            return {
                ...state,
                currentTasks: null,
                currentTask: null
            }
        case EDIT_TASK:
            return {
                ...state,
                currentTasks: state.currentTasks.map( task => task._id === action.payload._id ? action.payload : task ),
                currentTask: null
            };
        case CURRENT_TASK:
            return {
                ...state,
                currentTask: action.payload
            };
        case RESET_TASKS_STATE:
            return {
                formError: action.payload.formError,
                currentTasks: action.payload.currentTasks,
                currentTask: action.payload.currentTask
            };
        default:
            return state;
    }
};

export default TaskReducer;