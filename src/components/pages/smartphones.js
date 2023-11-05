import React, { useEffect, useState } from "react";
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
  }, [dispatch]);

  const elemXpagina = 5;
  const [paginaActual, setCurrentPage] = useState(1);
  const [numPaginas, setNumPaginas] = useState(1);

  const productosSmarthphone = products.filter(
    (product) => product.categoria === "smartphones"
  );

  useEffect(() => {
    const calculatedNumPaginas = Math.ceil(productosSmarthphone.length / elemXpagina);
    setNumPaginas(calculatedNumPaginas);
  }, [productosSmarthphone, elemXpagina]);

  const handleNextPage = () => {
    if (paginaActual < numPaginas) {
      setCurrentPage(paginaActual + 1);
    }
  };

  const handlePrevPage = () => {
    if (paginaActual > 1) {
      setCurrentPage(paginaActual - 1);
    }
  };

  const indexOfPrimerProducto = (paginaActual - 1) * elemXpagina;
  const indexOfUltimoProducto = Math.min(indexOfPrimerProducto + elemXpagina, productosSmarthphone.length);
  const currentProducts = productosSmarthphone.slice(indexOfPrimerProducto, indexOfUltimoProducto);

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
