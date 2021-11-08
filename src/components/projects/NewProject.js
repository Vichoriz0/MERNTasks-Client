import React, { Fragment, useState, useContext } from 'react';

/* Context */
import ProjectContext from '../../context/projects/ProjectContext';

const NewProject = () => {

    // Obtener elementos de los context
    const projCx = useContext(ProjectContext);
    const { form, formError, showForm, addProject, showError } = projCx;

    // State para proyecto
    const [ project, setProject ] = useState({ name: '' });

    // Extraer valores del proyecto
    const { name } = project;

    // Actualiza state del proyecto a medida que el usuario escribe
    const handleChange = e => {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    // Submit de un nuevo proyecto
    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if( name.trim() === '' ) {
            showError();
            return;
        }

        // Agregar al state del context
        addProject(project);

        // Reiniciar state local a su valor inicial
        setProject({ name: '' });

    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ showForm }
            >Nuevo Proyecto</button>

            { form 
                ? (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={ handleSubmit }
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre del proyecto"
                            name="name"
                            value={ name }
                            onChange={ handleChange }
                        />

                        <input 
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Agregar Proyecto"
                        />
                    </form>    
                ) : null
            }

            { formError ? <p className="mensaje error">Debe agregar un nombre de proyecto</p> : null }
        </Fragment>
    );
}
 
export default NewProject;