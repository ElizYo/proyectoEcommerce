import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../actions/pasaleraActions";
import Loader from "../../components/Loader";
import Error from '../../components/Error'
import { Link } from "react-router-dom";
import '../../style/orders.scss';

export default function Orders() {

  const orderstate = useSelector(state => state.getOrdersByUserIdReducer)

  const { orders, error, loading } = orderstate

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(getOrdersByUserId());
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);

  return (
    <div>
      <div className="orders-container">
        <div className="orders-table">
          <h2>Mis pedidos</h2>

          <table className="table table-striped table-responsive-sm">
            <thead>
              <tr>
                <th>ID del Pedido</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>ID de la Transacción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {loading && (<Loader />)}
              {orders && (orders.map(order => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.ordenMonto}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.idTransaccion}</td>
                    <td>{order.isDelivered ? (<li>Entregado</li>) : (<li>Pedido Realizado</li>)}</td>
                  </tr>
                );
              }))}

              {error && (<Error error='Algo salio mal' />)}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}