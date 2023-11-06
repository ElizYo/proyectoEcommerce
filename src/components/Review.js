import React, { useState } from 'react';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { addProductoReview } from '../actions/productosActions';
import starEmpty from "../../static/assets/images/star-empty.png";
import starFull from "../../static/assets/images/star-full.png";

export default function Review({ product }) {
    const dispatch = useDispatch();
    const [rating, setrating] = useState(5);
    const [comentario, setcomentario] = useState('');

    function sendreview() {
        if (localStorage.getItem('currentUser')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            var alreadyreviewed;

            for (var i = 0; i < product.reviews.length; i++) {
                if (product.reviews[i].idUser == currentUser._id) {
                    alreadyreviewed = true;
                }
            }

            if (alreadyreviewed) {
                alert('Ya tienes una review para este producto');
            } else {
                const review = {
                    rating: rating,
                    comentario: comentario
                };
                if (review && review.rating && review.comentario) {
                    dispatch(addProductoReview(review, product._id));
                } else {
                    alert('Asegúrate de completar todos los campos de la review');
                }
            }
        } else {
            window.location.href = '/login';
        }
    }
    return (
        <div className='shadow p-3 mb-5 bg-white rounded ml-2 mr-3'>
            <h2>Deja tu Review</h2>

            <Rating
                initialRating={product.rating}
                emptySymbol={<img src="/assets/images/star-empty.png" className="icon" style={{ width: 25, height: 25 }} />}
                fullSymbol={<img src="/assets/images/star-full.png" className="icon" style={{ width: 25, height: 25 }} />}
                onChange={(e) => { setrating(e) }}

            />

            <input type="text" className="form-control mt-2" value={comentario} onChange={(e) => { setcomentario(e.target.value) }} />
            <button className='btn mt-3' onClick={sendreview}>Submit Review</button>

            <h2 className='mt-3'>Latest Reviews</h2>

            {product.reviews && (product.reviews.map((review) => {
                return (
                    <div key={review.id}>
                        <Rating
                            initialRating={review.rating}
                            emptySymbol={<img src="/assets/images/star-empty.png" style={{ width: 25, height: 25 }} />}
                            fullSymbol={<img src="/assets/images/star-full.png" style={{ width: 25, height: 25 }} />}
                            readonly={true}
                        />
                        <p>{review.comentario}</p>
                        <p>By: {review.nombre}</p>
                        <hr />
                    </div>
                );
            }))}
        </div>
    )
}
