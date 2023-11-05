import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUsuario } from "../../actions/usuarioActions";
import Loader from "../Loader";
import Error from "../Error";
import '../../style/login.scss';

export default function Login() {

    const loginreducer = useSelector(state => state.loginReducer)
    const { currentUser, loading, error } = loginreducer

    const [usuario, setusuario] = useState("");
    const [password, setpassword] = useState("");


    const dispatch = useDispatch()

    function login(e) {

        e.preventDefault()

        const user = {
            usuario: usuario,
            password: password
        }

        dispatch(loginUsuario(user))


    }

    if (currentUser) {

        if (currentUser.isAdmin) {
            window.location.href = '/admin';
            return false;
        } else {
            window.location.href = '/';
            return false;
        }

    }

    return (
        <div>
            <div className="login-container">
                <div className="login-card">
                    <div className="login-content">
                        <h2>Iniciar Sesión</h2>

                        {error && (<Error error='Credenciales Invalidas' />)}
                        {loading && (<Loader />)}

                        <form onSubmit={login}>

                            <div className="input-container">
                                <input
                                    type="text"
                                    placeholder="Usuario"
                                    className="custom-input"
                                    value={usuario}
                                    required
                                    onChange={(e) => {
                                        setusuario(e.target.value);
                                    }}
                                />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="custom-input"
                                    value={password}
                                    required
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                    }}
                                />
                            </div>


                            <div className="button-container">
                                <button type='submit' className="button">Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>
                    <div className="login-footer">
                        <a href="/register" className='mt-3'>Crear Cuenta</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
