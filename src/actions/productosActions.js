import axios from "axios";
export const getAllProductos = () => (dispatch) => {
  
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("http://localhost:3000/api/productos/obtenertodosproductos")
    .then((res) => {
      console.log(res);

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};