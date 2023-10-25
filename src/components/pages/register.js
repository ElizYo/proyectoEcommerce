import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Error from "../Error";
import Loader from "../Loader";
import Success from "../Success";
import { registrarNuevoUsuario } from '../../actions/usuarioActions'
import '../../style/register.scss';

export default function Register() {

  const registerstate = useSelector(state => state.registerNuevoUsuarioReducer);
  const {loading , error , success} = registerstate

  const dispatch = useDispatch();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  /*const handleSubmit = (e) => {
    e.preventDefault();
  };*/

  function register(e) {
    e.preventDefault()
    const user = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      usuario: usuario,
      password: password
    };

    console.log(user);

    if (password == repassword) {
      dispatch(registrarNuevoUsuario(user))

    }
    else {
      alert('passwords not matched')
    }
  }

  return (
    <div>
      <div className="form-container">
        <div className="card">
          <div className="div">
            <h2>Register</h2>
            
            {loading && (<Loader/>)}
            {error && (<Error error ='Email Address is already registred' ></Error>)}
            {success && (<Success success='Your Registration is successfull' />)}

            <form onSubmit={register}>
              <input
                type="text"
                placeholder="Nombre"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido"
                className="form-control"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Usuario"
                className="form-control"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                className="form-control"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                required
              />
              <button type="submit">
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
