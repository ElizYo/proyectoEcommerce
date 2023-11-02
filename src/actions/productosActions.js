import axios from "axios";
export const getAllProductos = () => (dispatch) => {

  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/api/productos/obtenertodosproductos")
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
    .get(`/api/productos/productobyid?id=${productoid}`, {})
    .then((res) => {

      console.log("Action data", res.data);

      dispatch({ type: "GET_PRODUCTOBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log("Error action", err);
      dispatch({ type: "GET_PRODUCTOBYID_FAILED", payload: err });
    });
};

export const deleteproducto = (productoid) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCTO_REQUEST" });

  axios
    .delete(`/api/productos/deleteproduct`, { data: { productoid } })
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCTO_SUCCESS", payload: res.data });
      alert('El producto se eliminó correctamente')
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCTO_FAILED", payload: err });
    });
}

export const updateProducto = (productoModel) => (dispatch) => {

  dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

  axios
    .put(`/api/productos/updateproduct`, productoModel, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: res.data });
      alert("El producto se ha actualizado correctamente");
      window.location.reload("/admin/listadoproductos");
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "UPDATE_PRODUCT_FAILED", payload: err });
    });
}

export const addNewProduct = (product) => (dispatch, getState) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });

  //const currentUser = getState().loginReducer.currentUser;

  //product.currentUser = currentUser;

  axios.post('/api/productos/addproduct', product, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      console.log(res);
      dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: res.data });
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

  axios.post('/api/productos/addreview', data)
    .then(res => {
      console.log(res);
      dispatch({ type: 'ADD_PRODUCT_REVIEW_SUCCESS', payload: res.data });
      alert('Tu revisión se ha enviado correctamente');
      window.location.reload();
    })
    .catch(err => {
      dispatch({ type: 'ADD_PRODUCT_REVIEW_FAILED' });
    });
}

