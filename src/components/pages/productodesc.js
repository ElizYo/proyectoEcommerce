import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductoById } from "../../actions/productosActions";

export default function Productdesc({ match }) {

    
  const productoid = match.params.id;
  const dispatch = useDispatch();

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
                alt={product.nombre} // Make sure to add an 'alt' attribute for images
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
              <hr />
              <button className="btn btn-dark">ADD TO CART</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
