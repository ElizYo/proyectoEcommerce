import axios from "axios";

export const registrarNuevoUsuario = (usuario) => dispatch => {


    dispatch({ type: 'USER_REGISTER_REQUEST' })

    axios
        .post("/api/usuarios/register", usuario)
        .then(res => {
            dispatch({ type: 'USER_REGISTER_SUCCESS' })

            console.log(res);

        })
        .catch(err => {
            dispatch({ type: 'USER_REGISTER_FAILED', payload: err })
            console.log(err);

        });

}
