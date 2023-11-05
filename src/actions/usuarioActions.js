import axios from "axios";

export const registrarNuevoUsuario = (usuario) => dispatch => {


    dispatch({ type: 'USER_REGISTER_REQUEST' })

    axios
        .post("/api/usuarios/register", usuario)
        .then(res => {
            dispatch({ type: 'USER_REGISTER_SUCCESS' })
            window.location.href = '/login';
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
            dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user })

            console.log("Iniciaste sesión");

            localStorage.setItem('currentUser', JSON.stringify(res.data))

            if (res.data.isAdmin) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/';
            }
        })
        .catch(err => {
            dispatch({ type: 'USER_LOGIN_FAILED', payload: err })
            console.log("ERROR_LOGIN", err);

        });

}

export const logoutUsuario = () => dispatch => {


    localStorage.removeItem('currentUser')
    localStorage.removeItem('articles')

    dispatch({ type: 'USER_LOGOUT' })

    window.location.href = '/login'

}

export const updateUsuario = (userid, updateduser) => (dispatch, getState) => {

    console.log(updateduser);

    axios
        .put("/api/usuarios/updateusuario", { userid: userid, updateduser: updateduser })
        .then(res => {

            dispatch({ type: 'USER_UPDATE_SUCCESS', payload: updateduser })
            dispatch({ type: 'USER_LOGIN_SUCCESS', payload: updateduser })

            localStorage.setItem('currentUser', JSON.stringify(getState().loginReducer.currentUser));
            console.log(res)
        })
        .catch(err => {
            dispatch({ type: 'USER_UPDATE_FAILED', payload: err })
            console.log("ERROR_UPDATE_USER", err);
        });

}


export const getClienteById = (usuarioid) => (dispatch) => {

    dispatch({ type: "GET_CLIENT_BY_ID_REQUEST" });

    axios
        .get(`/api/usuarios/getusuariobyid?id=${usuarioid}`)
        .then((res) => {
            dispatch({ type: "GET_CLIENT_BY_ID_SUCCESS", payload: res.data });
        })
        .catch((err) => {
            console.log("Error action", err);
            dispatch({ type: "GET_CLIENT_BY_ID_FAILED", payload: err });
        });
};

export const updateClienteUsuario = (userid, clientData) => (dispatch, getState) => {

    console.log(clientData);

    dispatch({ type: 'CLIENT_UPDATE_REQUEST' })

    axios
        .put("/api/usuarios/updateusuario", { userid: userid, updateduser: clientData })
        .then(res => {

            dispatch({ type: 'CLIENT_UPDATE_SUCCESS' })

            console.log(res)
        })
        .catch(err => {
            dispatch({ type: 'CLIENT_UPDATE_FAILED', payload: err })
            console.log("ERROR_UPDATE_USER", err);
        });

}



export const getAllUsuarios = () => dispatch => {
    axios
        .get("/api/usuarios/getallusuarios")
        .then(res => {
            dispatch({ type: 'GET_ALL_USUARIOS_SUCCESS', payload: res.data })
        })
        .catch(err => {
            dispatch({ type: 'GET_ALL_USUARIOS_FAILED', payload: err })
        });
}

export const deleteUsuario = (userid) => dispatch => {
    dispatch({ type: 'DELETE_USUARIO_REQUEST' })

    axios
        .delete("/api/usuarios/deleteusuario", { data: { userid } })
        .then(res => {
            dispatch({ type: 'DELETE_USUARIO_SUCCESS', payload: res.data })
            alert('El usuario se eliminó correctamente')
            window.location.reload()
        })
        .catch(err => {
            dispatch({ type: 'DELETE_USUARIO_FAILED', payload: err })
        })
}
