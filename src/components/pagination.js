import React, { useState } from "react";

export default function Pagination({ data, numPaginas }) {
    const [paginaActual, setCurrentPage] = useState(1);

    const productsPerPage = numPaginas;

    const indexOfUltimoProducto = paginaActual * productsPerPage;
    const indexOfPrimerProducto = indexOfUltimoProducto - productsPerPage;
    const currentProducts = data.slice(indexOfPrimerProducto, indexOfUltimoProducto);
    setCurrentProducts(currentProducts);
    const handleNextPage = () => {
        setCurrentPage(paginaActual + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(paginaActual - 1);
    };

    return (
        <div>
            {currentProducts.map((item) => (
                <div key={item._id}>{item.name}</div>
            ))}
            <div className="pagination">
                {paginaActual > 1 && <button onClick={handlePrevPage}>Anterior</button>}
                {currentProducts.length === productsPerPage && (
                    <button onClick={handleNextPage}>Siguiente</button>
                )}
            </div>
        </div>
    );
}
