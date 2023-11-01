import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUsuario } from "../../actions/usuarioActions";
import Loader from "../Loader";
import Error from "../Error";

export default function Login() {
    
    const loginreducer = useSelector(state=>state.loginReducer)
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

    /*useEffect(() => {

        if (currentUser) {
            window.location.href = '/';
            return false;
        }

    }, [])*/

    if (currentUser) {
        window.location.href = '/';
        return false;
    }

    return (
        <div>
            <div className="row justify-content-center m-3">
                <div className="col-md-4 card p-3 shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "100px" }}>
                    <div className="div">
                        <h2 className="text-center m-3" style={{ display: "inline" }}>LOGIN</h2>
                        
                        {error && (<Error error='Credenciales Invalidas' />)}
                        {loading && (<Loader />)}

                        <form onSubmit={login}>

                            <input type="text" placeholder="usuario" className="form-control" value={usuario} required onChange={(e) => {
                                setusuario(e.target.value);
                            }}
                            />

                            <input type="password" placeholder="password" className="form-control" value={password} required onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                            />

                            <div className="text-right">
                                <button type='submit' className="btn mt-3">
                                    LOGIN
                                </button>
                            </div>
                        </form>
                    </div>
                    <a style={{ color: 'black' }} href="/register" className='mt-3'>Crear Cuenta</a>
                </div>
            </div>
        </div>
    );
}
