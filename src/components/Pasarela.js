import React from "react";
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/pasaleraActions";
import Loader from './Loader'
import Success from './Success'
import Error from './Error'

import "../style/product.scss";
export default function Pasarela({amount}) {

    const dispatch=useDispatch()
    
    const orderstate = useSelector(state=>state.placeOrderReducer)

    const { loading, success, error } = orderstate

    function tokenHandler(token) {
        console.log(token);
        dispatch(placeOrder(token, amount));
    }

    return(
        <div>
            {loading && (<Loader/>)}
            {success && (<Success success='Tu pedido ha sido realizado.'/>)}
            {error && (<Error error='Algo salio mal,intentalo de nuevo.'/>)}

            <StripeCheckout 
            token={tokenHandler}
            amount={amount}
            shippingAddress
            currency="EUR"
            stripeKey="pk_test_51O6DtGABEMRaYOZG8Hh0TePenTyvgssI4MJiqpD0FZkcoCdJvinOtJoO0YvcSlHSBq3oQNw7cS6BGMK6k8vkUgLG00xEFH1eqU"
            >
                <button class="btn">PAY NOW</button>
            </StripeCheckout>
        </div>
    )
}