export const registerNuevoUsuarioReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_REGISTER_REQUEST': return {
            ...state,
            loading: true
        }
        case 'USER_REGISTER_SUCCESS': return {
            ...state,
            loading: false,
            success: true
        }
        case 'USER_REGISTER_FAILED': return {
            ...state,
            loading: true,
            error: 'User Already Registred'
        }

        default: return state
    }

}
