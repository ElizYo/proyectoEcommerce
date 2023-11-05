import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../actions/pasaleraActions";
import Error from "../Error";
import Loader from "../Loader";
import 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function OrdersList() {
    const getOrdersState = useSelector(state => state.getAllOrdersReducer);
    const { loading, error, orders } = getOrdersState;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders());
    }, []);

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error error='Algo salió mal' />)}
            <h2>Orders List</h2>
            <table className='table table-bordered table-responsive-sm'>
                <thead>
                    <tr>
                        <th>Identificación del pedido</th>
                        <th>Correo electrónico</th>
                        <th>Identificación del usuario</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Identificación de la transacción</th>
                    </tr>
                </thead>

                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.email}</td>
                            <td>{order.idUser}</td>
                            <td>{order.ordenMonto}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.idTransaccion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
