import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../actions/productosActions";
import "../../style/addproduct.scss"

export default function AddProduct() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImagen] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const dispatch = useDispatch();

    const addproduct = (e) => {
        e.preventDefault();

        const product = {
            nombre,
            precio,
            stock,
            image,
            categoria,
            descripcion,
        };

        dispatch(addNewProduct(product));
    };

    return (
        <div className="add-product-container">
            <h1>Add new product</h1>
            <div className="form-container">
                <form onSubmit={addproduct}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Stock"
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
                        placeholder="Categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></input>
                    <button type="submit">Agregar Producto</button>
                </form>
            </div>
        </div>

    );
}
