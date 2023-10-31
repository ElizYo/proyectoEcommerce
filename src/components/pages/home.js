import React from "react";
import Product from './product';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductos } from "../../actions/productosActions";
import '../../style/index.scss';

export default function Home() {

  const getallproductsstate = useSelector(
    (state) => state.getAllProductosReducer
  );

  const { products } = getallproductsstate;

  const numPaginas = 9;
  const [paginaActual, setCurrentPage] = useState(1);

  const indexOfUltimoProducto = paginaActual * numPaginas;
  const indexOfPrimerProducto = indexOfUltimoProducto - numPaginas;
  const currentProducts = products.slice(indexOfPrimerProducto, indexOfUltimoProducto);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductos());
  }, []);

  const handleNextPage = () => {
    setCurrentPage(paginaActual + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(paginaActual - 1);
  };

  return (
    <div>
      <div className="product-container">
        {currentProducts.map((product) => (
          <div className="col-12 col-md-6 col-lg-4 p-5" key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {paginaActual > 1 && (
          <button onClick={handlePrevPage}>Anterior</button>
        )}
        {currentProducts.length === numPaginas && (
          <button onClick={handleNextPage}>Siguiente</button>
        )}
      </div>
    </div>
  );
}