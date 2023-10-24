import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  return (
      <div>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} className='image-fluid' />
          <h1>{product.nombre}</h1>
          <h1>rating: {product.rating}</h1>
          <h1>Precio: {product.precio}</h1>
        </Link>
      </div>
  )
};