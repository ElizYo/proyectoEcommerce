import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsuario } from "../../actions/usuarioActions";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Success from "../../components/Success";
import '../../style/profile.scss';

export default function Profile() {
  const loginstate = useSelector((state) => state.loginReducer);
  const updateUsuarioState = useSelector((state) => state.updateUsuarioReducer);
  const currentUser = loginstate.currentUser;
  const { loading, success, error } = updateUsuarioState
  const dispatch = useDispatch()

  if (!currentUser) {
    window.location.href = '/'
    return false;
  }

  const [nombre, setnombre] = useState(currentUser.nombre);
  const [email, setemail] = useState(currentUser.email);
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");

  function update(e) {

    e.preventDefault()
    if (password == repassword) {
      const updateduser = {
        nombre: nombre,
        email: email,
        password: password,
      };
      dispatch(updateUsuario(currentUser._id, updateduser));
    }
    else {
      alert('Las contaseñas no coinciden')
    }
  }

  return (

      <div className="profile-container">
        <div className="profile-card">
  
            <h2 className="text-card">Update</h2>

            {loading && <Loader />}
            {error && (
              <Error error="Algo salio mal"></Error>
            )}
            {success && <Success success="Tus datos se actualizaron correctamente" />}

            <form onSubmit={update}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="name"
                  className="custom-input"
                  required

                  value={nombre}
                  onChange={(e) => {
                    setnombre(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="email"
                  className="custom-input"
                  value={email}
                  required
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />

                <input
                  type="password"
                  placeholder="password"
                  className="custom-input"
                  value={password}
                  required
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />

                <input
                  type="password"
                  placeholder="confirm password"
                  className="custom-input"
                  value={repassword}
                  required
                  onChange={(e) => {
                    setrepassword(e.target.value);
                  }}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button">
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>


  );
}