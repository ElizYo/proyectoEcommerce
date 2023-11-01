import axios from "axios";
export const getAllProductos = () => (dispatch) => {
  
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("http://localhost:3000/api/productos/obtenertodosproductos")
    .then((res) => {
      //console.log(res.data);

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};



export const getProductoById = (productoid) => (dispatch) => {

  dispatch({ type: "GET_PRODUCTOBYID_REQUEST" });

  axios
    .get(`http://localhost:3000/api/productos/productobyid?id=${productoid}`, {})
    .then((res) => {
      
      console.log("Action data", res.json);

      dispatch({ type: "GET_PRODUCTOBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log("Error action",err);
      dispatch({ type: "GET_PRODUCTOBYID_FAILED", payload: err });
    });
};

export const deleteproducto = (productoid) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCTO_REQUEST" });

  axios
    .delete(`http://localhost:3000/api/productos/deleteproduct`, {data:{ productoid }})
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCTO_SUCCESS", payload: res.data });
      alert('El producto se eliminó correctamente')
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCTO_FAILED", payload: err });
    });
}

export const addNewProduct = (product) => (dispatch, getState) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });

  const currentUser = getState().loginReducer.currentUser;

  const data = {
    nombre: product.nombre,
    precio: product.precio,
    stock: product.stock,
    image: product.image,
    categoria: product.categoria,
    descripcion: product.descripcion,
    currentUser: currentUser
  };

  axios.post('http://localhost:3000/api/productos/addproduct', data)
    .then(res => {
      console.log(res);
      dispatch({ type: 'ADD_PRODUCT_SUCCESS',payload:res.data });
      alert('El producto se ha agregado correctamente');
      window.location.reload();
    })
    .catch(err => {
      dispatch({ type: 'ADD_PRODUCT_FAILED' });
    });
}

export const addProductoReview = (review, productoid) => (dispatch, getState) => {
  dispatch({ type: 'ADD_PRODUCT_REVIEW_REQUEST' });

  const currentUser = getState().loginReducer.currentUser;

  const data = {
    review: review, 
    productoid: productoid, 
    currentUser: currentUser 
  };

  axios.post('http://localhost:3000/api/productos/addreview', data)
    .then(res => {
      console.log(res);
      dispatch({ type: 'ADD_PRODUCT_REVIEW_SUCCESS',payload:res.data });
      alert('Tu revisión se ha enviado correctamente');
      window.location.reload();
    })
    .catch(err => {
      dispatch({ type: 'ADD_PRODUCT_REVIEW_FAILED' });
    });
}

