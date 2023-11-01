import React from "react";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { productid } = useParams();

  // Resto de la lógica de edición del producto utilizando productid

  return (
    <div>
      <h1>Editar Producto: {productid}</h1>
      {/* Resto de la lógica de edición del producto */}
    </div>
  );
}
