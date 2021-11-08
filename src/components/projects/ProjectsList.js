import React, { useContext, useEffect } from 'react';

/* Components */
import Project from './Project';

/* Context */
import ProjectContext from '../../context/projects/ProjectContext';
import AlertContext from '../../context/alerts/alertContext';

const ProjectsList = () => {

    // Obtener proyectos de state inicial
    const projCx = useContext(ProjectContext);
    const { msg, projects, getProjects } = projCx;

    const alertCx = useContext(AlertContext);
    const { alert, showAlert } = alertCx;

    // Cargar proyectos cuando carga el componente
    useEffect(() => {
        // Si hay un error
        if( msg )
            showAlert(msg.msg, msg.category);

        getProjects();
    //eslint-disable-next-line
    }, [msg]);

    // Revisar si hay algún proyecto para mostrar
    if( projects.length === 0 ) return <p>Comienza creando un proyecto</p>;

    return (
        <ul className="listado-proyectos">

            { alert ? 
                <div className={`alerta ${msg.category}`}>{ msg.msg }</div> 
            : null }

            {projects.map(project => (
                <Project
                    key={ project._id }
                    project={ project } 
                />
            ))}
        </ul>
    );
}
 
export default ProjectsList;