import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Context */
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const NewAccount = (props) => {

    // Extraer los valores de los context
    const alertCx = useContext(AlertContext);
    const { alert, showAlert } = alertCx;

    const authCx = useContext(AuthContext);
    const { msg, authenticated, registerUser } = authCx;

    // State para el inicio de sesión
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        pass: '',
        confirm: ''
    });

    // Extraer información del usuario
    const { name, email, pass, confirm } = user;

    // Cuando el usuario intenta registrarse
    useEffect(() => {
        // Si se pudo registrar correctamente
        if( authenticated ) 
            props.history.push('/projects');

        // Si hubo un error
        if( msg ) 
            showAlert(msg.msg, msg.category);
    //eslint-disable-next-line
    }, [msg, authenticated, props.history]);

    // Actualizar state a medida que el usuario escribe
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // Intentar crear cuenta
    const handleSubmit = e => {
        e.preventDefault();

        // Validar campos vacíos
        if( name.trim() === '' || email.trim() === '' || pass.trim() === '' || confirm.trim() === '' ) {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // Validar que la contraseña tenga mínimo 6 caracteres
        if( pass.length < 6) {
            showAlert('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
            return;
        }

        // Validar que ambas contraseñas sean iguales
        if( pass !== confirm ) {
            showAlert('Ambas contraseñas no son iguales', 'alerta-error');
            return;
        }

        // Pasarlo al action
        registerUser({
            name,
            email,
            pass
        });
    }

    return (
        <div className="form-usuario">

            { alert ? (
                <div className={`alerta ${alert.category}`}>
                    { alert.msg }
                </div>
            ) : null }

            <div className="contenedor-form sombra-dark">
                <h1>Crea una cuenta</h1>

                <form onSubmit={ handleSubmit }>
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu nombre de usuario"
                            value={ name }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@ejemplo.com"
                            value={ email }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="pass">Contraseña</label>
                        <input 
                            type="password"
                            id="pass"
                            name="pass"
                            placeholder="Tu contraseña"
                            value={ pass }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirm">Confirmar contraseña</label>
                        <input 
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Repite tu contraseña"
                            value={ confirm }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link 
                    to={'/'}
                    className="enlace-cuenta"
                >¿Ya tienes cuenta? Iniciar sesión</Link>
            </div>
        </div>
    );
}
 
export default NewAccount;