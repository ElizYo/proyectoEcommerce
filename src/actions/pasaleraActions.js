import axios from "axios";

export const placeOrder = (token, total) => (dispatch, getState) => {
    const currentUser = getState().loginReducer.currentUser;
    const articles = getState().getcarritoReducer.articles;


    dispatch({ type: 'PLACE_ORDER_REQUEST' });

    axios.post('http://localhost:3000/api/orders/placeorder', { token, total, currentUser, articles })
        .then(res => {""
            console.log("PLACE_ORDER_SUCCESS", res);
            dispatch({ type: 'PLACE_ORDER_SUCCESS' });
        })
        .catch(err => {
            console.log("PLACE_ORDER_ERROR", err);
            dispatch({ type: 'PLACE_ORDER_FAILED' });
        });
};
