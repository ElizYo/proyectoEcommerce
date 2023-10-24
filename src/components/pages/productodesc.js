import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductoById } from "../../actions/productosActions";
import { carritoActions } from "../../actions/carritoActions";

export default function Productdesc({ match }) {


  const productoid = match.params.id;
  const dispatch = useDispatch();

  const [cantidad, setcantidad] = useState(1);
  
  function addtocart() {
    dispatch(carritoActions(product, cantidad));
  }

  const getproductbyidstate = useSelector(
    (state) => state.getProductoByIdReducer
  );
  const { product, loading, error } = getproductbyidstate;


  useEffect(() => {
    dispatch(getProductoById(productoid));
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card p-2 m-3 shadow p-3 mb-5 bg-white rounded">
              <h1>
                <b>{product.nombre}</b>
              </h1>
              <hr />
              <img
                src={product.image}
                alt={product.nombre}
                className="img-fluid m-3 bigimg"
              />
              <p>{product.descripcion}</p>
            </div>
          </div>
          <div className="col-md-6 text-left">
            <div className="m-2 shadow p-3 mb-5 bg-white rounded">
              <h1>
                <b>Price: {product.precio}</b>
              </h1>
              <hr />
              <h1>Select Quantity</h1>
              <select
                value={cantidad}
                onChange={(e) => {
                  setcantidad(e.target.value);
                }}
              >{[...Array(product.stock).keys()].map((x, i) => {
                return <option value={i + 1}>{i + 1}</option>;
              })}
              </select>
              <hr />
              {product.stock > 0 ? (
                <button className="btn btn-dark" onClick={addtocart}>
                  ADD TO CART
                </button>
              ) : (

                <div>

                  <h1>Out Of StocK</h1>
                  <button className="btn" disabled onClick={addtocart}>
                    ADD TO CART

                  </button>
                </div>
              )}
            </div>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
}