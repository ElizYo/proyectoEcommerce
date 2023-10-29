import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsuario } from "../../actions/usuarioActions";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Success from "../../components/Success";
export default function Profile() {
  const loginstate = useSelector((state) => state.loginReducer);
  const updateUsuarioState = useSelector((state) => state.updateUsuarioReducer);
  const currentUser = loginstate.currentUser;
  const {loading , success, error} = updateUsuarioState
  const dispatch = useDispatch()
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
      dispatch(updateUsuario(currentUser._id , updateduser));
    }
    else{
        alert('Passwords Not matched')
    }
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-5 card p-3" style={{ marginTop: "150px" }}>
          <div className="div">
            <h2 className="text-center m-3">Update</h2>

            {loading && <Loader />}
            {error && (
              <Error error="Something went wrong"></Error>
            )}
            {success && <Success success="Your Details updated succes , please re-login" />}

            <form onSubmit={update}>
              <input
                type="text"
                placeholder="name"
                className="form-control"
                required
                
                value={nombre}
                onChange={(e) => {
                  setnombre(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="email"
                className="form-control"
                value={email}
                required
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="password"
                className="form-control"
                value={password}
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="confirm password"
                className="form-control"
                value={repassword}
                required
                onChange={(e) => {
                  setrepassword(e.target.value);
                }}
              />

              <div className="text-right">
                <button type="submit" className="btn mt-3">
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}