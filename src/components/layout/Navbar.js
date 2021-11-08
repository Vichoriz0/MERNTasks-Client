import React, { useContext, useEffect } from 'react';

/* Context */
import AuthContext from '../../context/auth/authContext';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const Navbar = () => {

    // Extraer valores de los context
    const authCx = useContext(AuthContext);
    const { user, getAuthenticatedUser, logOut } = authCx;

    const projCx = useContext(ProjectContext);
    const { resetProjectState } = projCx;

    const taskCx = useContext(TaskContext);
    const { resetTaskState } = taskCx;

    // Obtener la información del usuario autenticado
    useEffect(() => {
        getAuthenticatedUser();
    //eslint-disable-next-line
    }, []);

    const closeUserSession = () => {
        resetTaskState();
        resetProjectState();
        logOut();
    };

    return (
        <header className="app-header">

            { user ? <p className="nombre-usuario">Hola <span>{ user.name }</span></p> : null }

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={ closeUserSession }
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}
 
export default Navbar;