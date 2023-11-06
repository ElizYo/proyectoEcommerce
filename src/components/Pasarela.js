import React from "react";
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/pasaleraActions";
import { deleteFromCart } from "../actions/carritoActions";
import Loader from './Loader'
import Success from './Success'
import Error from './Error'

import "../style/product.scss";
export default function Pasarela({ amount }) {

    const dispatch = useDispatch()

    const orderstate = useSelector(state => state.placeOrderReducer)

    const { loading, success, error } = orderstate

    function tokenHandler(token) {
        console.log(token);
        dispatch(placeOrder(token, amount));
        if (success) {
            dispatch(deleteFromCart());
        }
    }

    return (
        <div className="button-container">
            <div className="loading-container">
                {loading && <Loader />}
            </div>
            <div className="success-container">
                {success && <Success success='Tu pedido ha sido realizado.' />}
            </div>
            <div className="error-container">
                {error && <Error error='Algo salió mal, inténtalo de nuevo.' />}
            </div>
            <StripeCheckout
                token={tokenHandler}
                amount={amount}
                shippingAddress
                currency="EUR"
                stripeKey="pk_test_51O6DtGABEMRaYOZG8Hh0TePenTyvgssI4MJiqpD0FZkcoCdJvinOtJoO0YvcSlHSBq3oQNw7cS6BGMK6k8vkUgLG00xEFH1eqU"
            >
                <button className="button">Pagar</button>
            </StripeCheckout>
        </div>
    )
}