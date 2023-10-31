export const getAllProductosReducer = (state = { products: [] }, action) => {


    switch (action.type) {
        case 'GET_PRODUCTS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'GET_PRODUCTS_SUCCESS': return {
            ...state,
            products: action.payload,
            loading: false
        }
        case 'GET_PRODUCTS_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const getProductoByIdReducer = (state = { product: {} }, action) => {


    switch (action.type) {
        case 'GET_PRODUCTOBYID_REQUEST': return {
            loading: true
        }
        case 'GET_PRODUCTOBYID_SUCCESS': return {
            ...state,
            product: action.payload,
            loading: false
        }
        case 'GET_PRODUCTOBYID_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const addProductoReviewReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT_REVIEW_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'ADD_PRODUCT_REVIEW_SUCCESS':
        return {
          ...state,
          loading: false,
          success: true,
        };
      case 'ADD_PRODUCT_REVIEW_FAILED':
        return {
          loading: false,
          error: true,
        };
      default:
        return state;
    }
  }
  
