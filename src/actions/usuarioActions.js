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

export const loginUsuario = (user) => dispatch => {


    dispatch({ type: 'USER_LOGIN_REQUEST' })

    axios
        .post("/api/usuarios/login", user)
        .then(res => {
            dispatch({ type: 'USER_LOGIN_SUCCESS' })
            console.log("Iniciaste sesión");

            localStorage.setItem('currentUser', JSON.stringify(res.data))

            window.location.href = '/'

        })
        .catch(err => {
            dispatch({ type: 'USER_LOGIN_FAILED', payload: err })
            console.log(err);

        });

}
