import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductoById, updateProducto } from "../../actions/productosActions";
import Loader from "../Loader";

export default function EditProduct({ match }) {

    const productid = match.params.id;
    const dispatch = useDispatch();

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImagen] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");


    const getproductbyidstate = useSelector(
        (state) => state.getProductoByIdReducer
    );
    const { product, loading, error } = getproductbyidstate;

    useEffect(() => {
        if (product) {
            if (product._id == match.params.productid) {
                setNombre(product.nombre);
                setPrecio(product.precio);
                setStock(product.stock);
                setImagen(product.image);
                setCategoria(product.categoria);
                setDescripcion(product.descripcion);
            } else {
                dispatch(getProductoById(match.params.productid));
            }
        } else {
            dispatch(getProductoById(match.params.productid));
        }
    }, [dispatch, product]);
    function editproduct(e) {
        e.preventDefault();
        const productoModel = {
            nombre: nombre,
            precio: precio,
            stock: stock,
            image: image,
            categoria: categoria,
            descripcion: descripcion,

        };

        dispatch(updateProducto(match.params.productid, productoModel));
    }


    return (
        <div className="add-product-container">
            <h1>Editar Producto: {match.params.productid}</h1>
            <div className="form-container">
                <form onSubmit={editproduct}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Precio"
                        required
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        required
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="URL de la imagen"
                        value={image}
                        onChange={(e) => setImagen(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Categoría"
                        required
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Descripción"
                        required
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />

                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
}