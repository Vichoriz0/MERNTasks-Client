import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

/* Context */
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {

    // Extraer valores del context
    const authCx = useContext(AuthContext);
    const { authenticated, loading, getAuthenticatedUser } = authCx;

    // Obtener usuario autenticado
    useEffect(() => {
        getAuthenticatedUser();
    //eslint-disable-next-line
    }, []);

    return (
        <Route {...props} render={ props => 
            !authenticated && !loading ? (<Redirect to="/" />) : (<Component {...props} />)}
        />
    );
}
 
export default PrivateRoute;