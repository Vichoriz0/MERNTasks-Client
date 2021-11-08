import React, { useContext, useEffect } from 'react';

/* Components */
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import TasksForm from '../tasks/TasksForm';
import TasksList from '../tasks/TasksList';

/* Context */
import AuthContext from '../../context/auth/authContext';

const Projects = () => {

    // Extraer valores del context
    const authCx = useContext(AuthContext);
    const { getAuthenticatedUser } = authCx;

    // Obtener la información del usuario autenticado
    useEffect(() => {
        getAuthenticatedUser();
    //eslint-disable-next-line
    }, []);

    return (
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">
                <Navbar />

                <main>
                    <TasksForm />

                    <div className="contenedor-tareas">
                        <TasksList />
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Projects;