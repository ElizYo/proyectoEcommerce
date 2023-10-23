import axios from "axios";
export const getAllProductos = () => (dispatch) => {
  
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("http://localhost:3000/api/productos/obtenertodosproductos")
    .then((res) => {
      console.log(res.json);

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
