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

        /*const product = {
            nombre,
            precio,
            stock,
            image,
            categoria,
            descripcion,
        };
        dispatch(addNewProduct(product));

        */


        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('image', image);
        formData.append('categoria', categoria);
        formData.append('descripcion', descripcion);

        dispatch(addNewProduct(formData));

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
                        type="file"
                        placeholder="Sube tu imagen"
                        onChange={(e) => setImagen(e.target.files[0])}
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
