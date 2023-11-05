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
    const [image, setImagen] = useState(null);
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

        const formData = new FormData();
        formData.append('producto_id', String(match.params.productid));
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('image', image);
        formData.append('categoria', categoria);
        formData.append('descripcion', descripcion);

        dispatch(updateProducto(formData));
    }




    return (
        <div className="add-product-container">
            <h1>Editar Producto:</h1>
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
                        type="file"
                        placeholder="Sube tu imagen"
                        onChange={(e) => setImagen(e.target.files[0])}
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