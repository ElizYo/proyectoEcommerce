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

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_UPDATE_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'PRODUCT_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'PRODUCT_UPDATE_FAILED':
      return {
        ...state,
        loading: false,
        error: 'El producto ya existe',
      };
    default:
      return state;
  }
}

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_REGISTER_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'PRODUCT_REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'PRODUCT_REGISTER_FAILED':
      return {
        ...state,
        loading: false,
        error: 'El producto ya existe',
      };
    default:
      return state;
  }
};


export const deleteProductReducer = (state = {}, action) => {

  switch (action.type) {
      case 'DELETE_PRODUCT_REQUEST': return {
          ...state,
          loading: true
      }
      case 'DELETE_PRODUCT_SUCCESS': return {
          ...state,
          loading: false,
          success: true
      }
      case 'DELETE_PRODUCT_FAILED': return {
          ...state,
          loading: false,
          error: action.payload
      }

      default: return state
  }

};

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
  
