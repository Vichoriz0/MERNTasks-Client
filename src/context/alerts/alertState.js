import React, { useReducer } from 'react';

import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SHOW_ALERT, HIDE_ALERT } from '../../types';

const AlertState = props => {
    const initialState = {
        alert: null
    };

    const [ state, dispatch ] = useReducer(AlertReducer, initialState);

    // Funciones
    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: { msg, category }
        });

        // Limpiar alerta después de 5 seg
        setTimeout(() => {
            dispatch({ type: HIDE_ALERT });
        }, 5000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            { props.children }
        </AlertContext.Provider>
    );
};

export default AlertState;