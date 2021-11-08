import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Context */
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {

    // Extraer valores de los context
    const alertCx = useContext(AlertContext);
    const { alert, showAlert } = alertCx;

    const authCx = useContext(AuthContext);
    const { msg, authenticated, logIn } = authCx;

    // State para el inicio de sesión
    const [ user, setUser ] = useState({
        email: '',
        pass: ''
    });

    // Extraer información del usuario
    const { email, pass } = user;

    // Cuando el usuario intenta ingresar
    useEffect(() => {
        // Si pudo ingresar correctamente
        if( authenticated ) 
            props.history.push('/projects');

        // Si hubo un error
        if( msg ) 
            showAlert(msg.msg, msg.category);
    //eslint-disable-next-line
    }, [msg, authenticated, props.history]);

    // Intentar iniciar sesión
    const handleSubmit = e => {
        e.preventDefault();

        // Validar campos vacíos
        if( email.trim() === '' || pass.trim() === '' ) {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return; 
        }

        // Pasarlo al action
        logIn({ email, pass });
    }

    return (
        <div className="form-usuario">

            { alert ? (
                <div className={`alerta ${alert.category}`}>
                    { alert.msg }
                </div>
            ) : null }

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form onSubmit={ handleSubmit }>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@ejemplo.com"
                            value={ email }
                            onChange={ e => setUser({...user, [e.target.name]: e.target.value}) }
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
                            onChange={ e => setUser({...user, [e.target.name]: e.target.value}) }
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>

                <Link 
                    to={'/new-account'}
                    className="enlace-cuenta"
                >¿No tienes cuenta? Regístrate</Link>
            </div>
        </div>
    );
}
 
export default Login;