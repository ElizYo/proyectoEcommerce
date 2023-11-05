import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateClienteUsuario, getClienteById } from "../../actions/usuarioActions";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Success from "../../components/Success";
import '../../style/profile.scss';

export default function EditUser({ match }) {

    const userId = match.params.clientid;
    const loginstate = useSelector((state) => state.loginReducer);
    const updateUsuarioState = useSelector((state) => state.updateClienteUsuarioReducer);
    const currentUser = loginstate.currentUser;
    const { loading, success, error } = updateUsuarioState
    const dispatch = useDispatch()

    if (currentUser.isAdmin == false) {
        window.location.href = '/'
        return false;
    }

    const ClienteState = useSelector((state) => state.getClientByIdReducer);

    console.log("ClienteState", ClienteState);
    const { loadingClient, errorClient, cliente } = ClienteState;

    useEffect(() => {

        if (cliente) {
            if (cliente._id == userId) {
                setnombre(cliente.nombre);
                setemail(cliente.email);
                setIsAdmin(cliente.isAdmin);
            } else {
                dispatch(getClienteById(userId));
            }
        } else {
            console.log("Entre por fallo", cliente);
            dispatch(getClienteById(userId));
        }
    }, [dispatch, cliente]);

    const [nombre, setnombre] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [repassword, setrepassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    function update(e) {

        e.preventDefault()

        if (password == repassword) {
            const updateduser = {
                nombre: nombre,
                email: email,
                password: password,
                isAdmin: isAdmin
            };
            dispatch(updateClienteUsuario(userId, updateduser));
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
                            placeholder="nombre"
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
                            required
                            value={email}
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="custom-input"
                            value={password}
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                        />

                        <input
                            type="password"
                            placeholder="confirm password"
                            className="custom-input"
                            value={repassword}
                            onChange={(e) => {
                                setrepassword(e.target.value);
                            }}
                        />
                        <select
                            className="custom-select"
                            value={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.value === 'true')}
                        >
                            <option value="true">Admin</option>
                            <option value="false">No Admin</option>
                        </select>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="button">
                            Actualizar datos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}