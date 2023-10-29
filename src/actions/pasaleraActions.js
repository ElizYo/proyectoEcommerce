import axios from "axios";

export const placeOrder = (token, total) => (dispatch, getState) => {
    const currentUser = getState().loginReducer.currentUser;
    const articles = getState().getcarritoReducer.articles;

    const carritoProducos = new Array();

    for(var i = 0; i<articles.length; i++){
        var articulo = {
            nombre : articles[i].nombre,
            cantidad : articles[i].cantidad,
            precio : articles[i].precio,
            _id : articles[i]._id
        }

        carritoProducos.push(articulo);
    }


    dispatch({ type: 'PLACE_ORDER_REQUEST' });

    axios.post('/api/orders/placeorder', { token, total, currentUser, articles })
        .then(res => {""
            dispatch({ type: 'PLACE_ORDER_SUCCESS' });
        })
        .catch(err => {
            console.log("PLACE_ORDER_ERROR", err);
            dispatch({ type: 'PLACE_ORDER_FAILED' });
        });
};

export const getOrdersByUserId=()=>(dispatch , getState)=>{

    const userid = getState().loginReducer.currentUser._id;

    axios.post('/api/orders/getordersbyuserid' , {userid:userid}).then(res=>{

        dispatch({type:'GET_ORDERSBYUSERID_SUCCESS' , payload:res.data})
        console.log(res.data);

    }).catch(err=>{
        console.log(err);
        dispatch({type:'GET_ORDERSBYUSERID_FAILED' , payload:err})

    })

}

/*export const getOrderById=(orderid)=>(dispatch , getState)=>{

    dispatch({type:'GET_ORDERBYID_REQUEST'})

    axios.post('/api/orders/getorderbyid' , {orderid:orderid}).then(res=>{

        dispatch({type:'GET_ORDERBYID_SUCCESS' , payload:res.data})
        console.log(res.data);

    }).catch(err=>{
        dispatch({type:'GET_ORDERBYID_FAILED' , payload:err})

    })
}

export const getAllOrders=()=>(dispatch , getState)=>{

    dispatch({type:'GET_ALLORDERS_REQUEST'})

    axios.get('/api/orders/getallorders').then(res=>{

         dispatch({type:'GET_ALLORDERS_SUCCESS' , payload:res.data})
         console.log(res.data);

    }).catch(err=>{
        dispatch({type:'GET_ALLORDERS_FAILED' , payload:err})

    })
}*/