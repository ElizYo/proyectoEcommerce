import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductos } from "../../actions/productosActions";
import Product from "./product";

export default function Perifericos() {
  const getallproductsstate = useSelector(
    (state) => state.getAllProductosReducer
  );
  const { products } = getallproductsstate;

  useEffect(() => {
    dispatch(getAllProductos());
  }, [dispatch]);

  const dispatch = useDispatch();

  const elemXpagina = 5;
  const [paginaActual, setCurrentPage] = useState(1);
  const [numPaginas, setNumPaginas] = useState(1);


  useEffect(() => {
    const productosPorPagina = productosPerifericos.slice(
      (paginaActual - 1) * elemXpagina,
      paginaActual * elemXpagina
    );

    const calculatedNumPaginas = Math.ceil(productosPorPagina.length / elemXpagina);
    setNumPaginas(calculatedNumPaginas);

    setNumPaginas(calculatedNumPaginas);
  }, [products]);

  const productosPerifericos = products.filter(
    (product) => product.categoria === "perifericos"
  );

  const indexOfPrimerProducto = (paginaActual - 1) * elemXpagina;
  const indexOfUltimoProducto = indexOfPrimerProducto + elemXpagina;
  const currentProducts = productosPerifericos.slice(
    indexOfPrimerProducto,
    indexOfUltimoProducto
  );

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
      {numPaginas > 1 && ( // Verifica si hay más de una página
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
