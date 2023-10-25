export const getcarritoReducer = (state = { articles: [] }, action) => {

    //console.log("Datos reducer carrito", state);

    switch (action.type) {
        case 'ADD_TO_CART':

            const alreadyexist = state.articles ? state.articles.find(item => item._id == action.payload._id) : false

            if (alreadyexist) {

                return {
                    ...state,
                    articles: state.articles.map((item) => item._id == action.payload._id ? action.payload : item)
                }

            }
            else {

                return {
                    ...state,
                    articles: [...state.articles, action.payload]
                }
            }

        case 'DELETE_FROM_CART': return {

            ...state,
            articles: state.articles.filter(item => { return item._id !== action.payload._id })

        }
        default: return state
    }

}