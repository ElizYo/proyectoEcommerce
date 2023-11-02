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
        <div className="row mt-5 align-items-stretch">
          <div className="col-md-6">
            <div className="card p-2 m-3 shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: "none" }}>
              <img
                src={"/assets/images/" + product.image}
                alt={product.nombre}
                className="img-fluid m-3 bigimg mx-auto"
                style={{ width: "560px", height: "560px" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="row align-items-stretch">
              <div className="col-md-6">
                <div className="m-2 shadow p-3 mb-5 bg-white rounded" style={{ height: "605px" }}>
                  <h1>
                    <b className="nombre-product">{product.nombre}</b>
                  </h1>
                  <p>{product.descripcion}</p>
                </div>
              </div>
              <div className="col-md-6 text-left">
                <div className="m-2 shadow p-3 mb-5 bg-white rounded">
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