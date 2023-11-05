import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductos } from "../../actions/productosActions";
import Product from "./product";

export default function Perifericos() {
  const getallproductsstate = useSelector(
    (state) => state.getAllProductosReducer
  );
  const { products } = getallproductsstate;

  const dispatch = useDispatch();

  const elemXpagina = 5;
  const [paginaActual, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProductos());
  }, [dispatch]);

  const productosPerifericos = products.filter(
    (product) => product.categoria === "perifericos"
  );

  const indexOfPrimerProducto = (paginaActual - 1) * elemXpagina;
  const indexOfUltimoProducto = indexOfPrimerProducto + elemXpagina;
  const currentProducts = productosPerifericos.slice(
    indexOfPrimerProducto,
    indexOfUltimoProducto
  );

  const numPaginas = Math.ceil(productosPerifericos.length / elemXpagina);

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
          <div className="card-container" key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
      {numPaginas > 1 && (
        <div className="pagination">
          {paginaActual > 1 && (
            <button onClick={handlePrevPage}>Anterior</button>
          )}
          {numPaginas > 1 &&
            [...Array(numPaginas).keys()].map((num) => {
              let classItem = `h3 border p-3 cursor-pointer ${paginaActual === num + 1 ? "bg-black text-light" : ""
                }`;
              return (
                <div
                  key={num}
                  className={classItem}
                  onClick={() => {
                    setCurrentPage(num + 1);
                  }}
                >
                  <span className="user-select-none">{num + 1}</span>
                </div>
              );
            })}
          {paginaActual < numPaginas && (
            <button onClick={handleNextPage}>Siguiente</button>
          )}
        </div>
      )}
    </div>
  );
}
