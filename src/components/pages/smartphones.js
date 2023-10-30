import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductos } from "../../actions/productosActions";
import Product from "./product"; 
export default function Smartphones() {
  const getallproductsstate = useSelector(
    (state) => state.getAllProductosReducer
  );
  const { products } = getallproductsstate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductos());
  }, []);

  const productosOrdenadores = products.filter(
    (product) => product.categoria === "smartphones"
  );

  return (
    <div>
      <div className="product-container">
        {productosOrdenadores.map((product) => (
          <div className="col-12 col-md-6 col-lg-4 p-5" key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
