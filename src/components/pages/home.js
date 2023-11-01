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

  const elemXpagina = 5

  const numPaginas = Math.ceil(products.length / elemXpagina);

  const [paginaActual, setCurrentPage] = useState(1);

  const indexOfPrimerProducto = (paginaActual - 1) * elemXpagina;

  const indexOfUltimoProducto = indexOfPrimerProducto + elemXpagina

  const currentProducts = products.slice(indexOfPrimerProducto, indexOfUltimoProducto);

  console.log(currentProducts)

  const handleNextPage = () => {
      setCurrentPage(paginaActual + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage(paginaActual - 1);
    };

    console.log("paginaac",paginaActual)
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductos());
  }, []);


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
                {[...Array(numPaginas).keys()].map(num => {
                    let classItem=`h3 border p-3 cursor-pointer ${(paginaActual==num+1?"bg-black text-light":"")}`;
                    return (<div className={classItem} onClick={() => {setCurrentPage(num+1)}}><span className="user-select-none">{num+1}</span></div>)
                })}
                { paginaActual < numPaginas && (
                <button onClick={handleNextPage}>Siguiente</button>
                )}
            </div>
        </div>
  );
}