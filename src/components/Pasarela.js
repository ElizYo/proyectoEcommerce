import React from "react";
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch } from "react-redux";
import { placeOrder } from "../actions/pasaleraActions";
import "../style/product.scss";
export default function Pasarela({amount}) {
    const dispatch=useDispatch()

    function tokenHandler(token) {
        console.log(token);
        dispatch(placeOrder(token, amount));
    }

    return(
        <div>
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