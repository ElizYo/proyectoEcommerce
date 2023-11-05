export const registerNuevoUsuarioReducer = (state = { currentUser: {} }, action) => {

    switch (action.type) {
        case 'USER_REGISTER_REQUEST': return {
            ...state,
            loading: true
        }
        case 'USER_REGISTER_SUCCESS': return {
            ...state,
            loading: false,
            success: true,
            error:false,
            currentUser: action.payload
        }
        case 'USER_REGISTER_FAILED': return {
            ...state,
            loading: false,
            error: 'El usuario ya esta registrado'
        }

        default: return state
    }

}


export const loginReducer = (state = { currentUser: {} }, action) => {

    switch (action.type) {
        case 'USER_LOGIN_REQUEST': return {
            ...state,
            loading: true
        }
        case 'USER_LOGIN_SUCCESS': return {
            ...state,
            loading: false,
            success: true,
            currentUser: action.payload
        }
        case 'USER_UPDATE_SUCCESS': return {
            ...state,
            loading: false,
            success: true,
            error:false,
            currentUser: {
                ...state.currentUser,
                nombre: action.payload.nombre,
                email: action.payload.email
            }
        }
        case 'USER_LOGIN_FAILED': return {
            ...state,
            loading: false,
            error: 'Credenciales Invalidas'
        }

        case 'USER_LOGOUT': return {
            ...state
        }

        default: return state
    }

}

export const updateUsuarioReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_UPDATE_REQUEST': return {
            ...state,
            loading: true
        }
        case 'USER_UPDATE_SUCCESS': return {
            ...state,
            loading: false,
            success: true
        }
        case 'USER_UPDATE_FAILED': return {
            ...state,
            loading: false,
            error: 'Datos de usuario acualizados'
        }

        default: return state
    }

}

export const updateClienteUsuarioReducer = (state = {}, action) => {

    switch (action.type) {
        case 'CLIENT_UPDATE_REQUEST': return {
            ...state,
            loading: true
        }
        case 'CLIENT_UPDATE_SUCCESS': return {
            ...state,
            loading: false,
            success: true
        }
        case 'CLIENT_UPDATE_FAILED': return {
            ...state,
            loading: false,
            error: 'Datos de usuario acualizados'
        }

        default: return state
    }

}


export const getClientByIdReducer = (state = { cliente : {} }, action) => {

    switch (action.type) {
        case 'GET_CLIENT_BY_ID_REQUEST': return {
            ...state,
            loading: true
        }
        case 'GET_CLIENT_BY_ID_SUCCESS': 
            return {
            ...state,
            cliente: action.payload,
            loading: false
        }
        case 'GET_CLIENT_BY_ID_FAILED': return {
            ...state,
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const getAllUsersReducer = (state = { usuarios: [] }, action) => {
    switch (action.type) {
        case 'GET_ALL_USUARIOS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_ALL_USUARIOS_SUCCESS':
            return {
                ...state,
                loading: false,
                usuarios: action.payload
            };
        case 'GET_ALL_USUARIOS_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


export const deleteUsuarioReducer = (state = {}, action) => {

    switch (action.type) {
        case 'DELETE_USUARIO_REQUEST': return {
            ...state,
            loading: true
        }
        case 'DELETE_USUARIO_SUCCESS': return {
            ...state,
            loading: false,
            success: true
        }
        case 'DELETE_USUARIO_FAILED': return {
            ...state,
            loading: false,
            error: action.payload
        }

        default: return state
    }

};
