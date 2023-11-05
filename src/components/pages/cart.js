import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { carritoActions, deleteFromCart } from '../../actions/carritoActions'
import '../../style/product.scss';
import Pasarela from '../Pasarela';


export default function Cart() {

    const carritoReducerstate = useSelector(state => state.getcarritoReducer)
    const dispatch = useDispatch()
    const { articles } = carritoReducerstate

    var total = articles.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    return (
        <div className="cart-container">
            <div className="cart-card" style={{ maxWidth: "none", width: "80%", padding: "20px" }}>
                <h2 className="card-content">Mi compra</h2>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>

                        <tbody>

                            {articles.map(item => {

                                return <tr>
                                    <td>{item.nombre}</td>
                                    <td>{item.precio}</td>
                                    <td><select value={item.cantidad} onChange={(e) => { dispatch(carritoActions(item, e.target.value)) }}>

                                        {[...Array(item.stock).keys()].map((x, i) => {

                                            return <option value={i + 1}>{i + 1}</option>

                                        })}

                                    </select></td>
                                    <td>{item.cantidad * item.precio}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deleteFromCart(item))} />
                                    </td>
                                </tr>

                            })}

                        </tbody>

                    </table>

                    <hr />


                    <h2 className='text-center'>Total: {total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</h2>

                    <hr />
                    <Pasarela amount={total} />

                </div>

            </div>

        </div>
    )
}