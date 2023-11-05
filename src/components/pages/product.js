import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/product.scss';
import Rating from 'react-rating';

import { Link } from 'react-router-dom';
export default function Product({ product }) {
  return (
    <div className='card item-card px-4 py-3'>
      <Link to={`/product/${product._id}`}>
        <div className='productStyle'>
        <img src={"/assets/images/" + product.image} className='image-fluid' />
          <div className="item-info">
            <div className="h1-nombre">{product.nombre}</div>
            <div className="h1">Precio: <span className="precio-container">{product.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></div>
            <div className="rating">
              <Rating
                  initialRating={product.rating}
                  emptySymbol={<img src="/assets/images/star-empty.png" className="icon" style={{ width: 25, height: 25 }} />}
                  fullSymbol={<img src="/assets/images/star-full.png" className="icon" style={{ width: 25, height: 25 }} />}
                  readonly={true}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}


