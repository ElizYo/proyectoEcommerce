import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/product.scss';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  return (
      <div className='card item-card px-4 py-3'>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} className='image-fluid' />
          <div className="item-info">
            <div className="h1">{product.nombre}</div>
            <div className="h1">Rating: {product.rating}</div>
            <div className="h1">Precio: {product.precio}</div>
          </div>
        </Link>
      </div>
  )
};
