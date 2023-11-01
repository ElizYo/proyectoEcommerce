import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductos } from "../../actions/productosActions";
import {Link} from 'react-router-dom';
import Error from "../Error";
import Loader from "../Loader";
import 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProductsList() {

    const dispatch = useDispatch()

    const getallproductsstate = useSelector(
        state => state.getAllProductosReducer
    );

    const { products, loading, error } = getallproductsstate;

    useEffect(() => {
        dispatch(getAllProductos());
    }, []);

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

    return (
        <div>

            <h2>Products list</h2>

            <table className='table table-bordered table-responsive-sm'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                {loading && (<Loader />)}
                    {error && (<Error error='Algo salio mal' />)}
                    {products && (currentProducts.map((product, index) => {

                        return (<tr>
                            <td style={{width: '450px'}}>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.stock}</td>
                            <td>{product._id}</td>
                            <td>
                                <i className="bi bi-trash" style={{ marginRight: '10px' }} onClick={() => { dispatch(deleteProduct(product._id)) }}></i>
                                <Link to={`/admin/editproduct/${product._id}`}><i className="bi bi-pen"></i></Link>
                            </td>
                        </tr>)
                    }))}
                </tbody>
            </table>
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
    )
}
