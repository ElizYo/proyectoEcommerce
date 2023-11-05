import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductoById } from "../../actions/productosActions";
import { carritoActions } from "../../actions/carritoActions";
import '../../style/productdesc.scss';
import Review from "../Review";

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
        <div className="productdesc-container">
          <div className="productdescard-container-left">
            <div className="productdesc-card" style={{ maxWidth: "none" }}>
              <img
                src={"/assets/images/" + product.image}
                alt={product.nombre}
                className="img-fluid m-3 bigimg mx-auto"
              />
            </div>
          </div>


          <div className="productdesc-container-right">
            <div className="productdesc-container no-margin-top">

              <div className="productdesc-container-desc">
                <div className="productdesc-card altura-card">
                  <h1>
                    <b className="nombre-product">{product.nombre}</b>
                  </h1>
                  <p>{product.descripcion}</p>
                </div>
              </div>

              <div className="productdesc-container-price">
                <div className="productdesc-card">
                  <h1>
                    <b>Price: {product.precio} €</b>
                  </h1>
                  <hr />
                  <h1>Cantidad</h1>
                  <select
                    value={cantidad}
                    onChange={(e) => {
                      setcantidad(e.target.value);
                    }}
                  >
                    {[...Array(product.stock).keys()].map((x, i) => {
                      return <option key={i} value={i + 1}>{i + 1}</option>;
                    })}
                  </select>
                  <hr />
                  {product.stock > 0 ? (
                    <button className="btn btn-dark" onClick={addtocart}>
                      Añadir al carrito
                    </button>
                  ) : (
                    <div>
                      <h1>Fuera de Stock</h1>
                      <button className="btn" disabled onClick={addtocart}>
                        Añadir al carrito
                      </button>
                    </div>
                  )}
                </div>
                <hr />
                <Review key={product.id} product={product} />
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}