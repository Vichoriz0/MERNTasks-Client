import React, { useReducer } from 'react';
import axiosClt from '../../config/axios';
import tokenAuth from '../../config/token';

import AuthContext from './authContext.js';
import AuthReducer from './authReducer';
import {
    SIGNUP_SUCCESSFUL,
    SIGNUP_ERROR,
    GET_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    LOGOUT
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        msg: null,
        loading: true
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    /* Funciones */
    // Retorna un usuario autenticado
    const getAuthenticatedUser = async () => {
        const token = localStorage.getItem('token');

        // Agrega el token a los defaults headers de axios
        if( token ) 
            tokenAuth(token);

        try {
            const response = await axiosClt.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });
        } catch(err) {
            dispatch({
                type: LOGIN_ERROR
            });
        }
    };

    // Registrar un nuevo usuario
    const registerUser = async userData => {
        try {
            const response = await axiosClt.post('/api/users', userData);

            dispatch({
                type: SIGNUP_SUCCESSFUL,
                payload: response.data
            });

            // Obtener el usuario
            getAuthenticatedUser();
        } catch(err) {
            const alert = {
                msg: err.response.data.msg,
                category: 'alerta-error'
            };

            dispatch({
                type: SIGNUP_ERROR,
                payload: alert
            });
        }
    };

    // Inicio de sesión del usuario
    const logIn = async userData => {
        try {
            const response = await axiosClt.post('/api/auth', userData);

            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: response.data
            });

            // Obtener el usuario
            getAuthenticatedUser();
        } catch(err) {
            const alert = {
                msg: err.response.data.msg,
                category: 'alerta-error'
            };

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        } 
    };

    // Cerrar sesión del usuario
    const logOut = () => {
        dispatch({
            type: LOGOUT
        });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                getAuthenticatedUser,
                registerUser,
                logIn,
                logOut
            }}
        >
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthState;

