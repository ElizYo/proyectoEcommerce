export const getAllProductosReducer=(state={products : []} ,action)=>{


    switch(action.type)
    {
        case 'GET_PRODUCTS_REQUEST':
            return {
              ...state,
              loading: true,
            };
        case 'GET_PRODUCTS_SUCCESS' : return {
            ...state,
            products : action.payload,
            loading : false
        }
        case 'GET_PRODUCTS_FAILED' : return{
            error : action.payload,
            loading : false
        }
        default : return state
    }

}

export const getProductoByIdReducer = (state = { product: {} }, action) => {


    switch(action.type)
    {
        case 'GET_PRODUCTOBYID_REQUEST' : return {
            loading : true
        }
        case 'GET_PRODUCTOBYID_SUCCESS' : return {
            ...state,
            product : action.payload,
            loading : false
        }
        case 'GET_PRODUCTOBYID_FAILED' : return{
            error : action.payload,
            loading : false
        }
        default : return state
    }

}
export const getProductByTextReducer = (state = { productsFiltered: [], products: [] }, action) => {

    switch(action.type) {
        case 'GET_PRODUCTS_BY_TEXT':
            const result = state.products.filter((product) => product.nombre.includes(action.payload));
            return {
                ...state,
                productsFiltered: result
            }
        case 'GET_PRODUCTO_BY_TEXT_SUCCESS': 
            return {
                product: action.payload,
                loading: false
            }
        case 'GET_PRODUCTO_BY_TEXT_FAILED': 
            return {
                error: action.payload,
                loading: false
            }
        default: return state;
    }
}
