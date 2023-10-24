import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {

    const carritoReducerstate = useSelector(state=>state.getcarritoReducer)
    const dispatch = useDispatch()
    const {articles} = carritoReducerstate

    var subtotal = articles.reduce((acc , item) => acc + (item.precio*item.cantidad) , 0) 

    return (
        <div>
            
            <div className="row mt-3 justify-content-center">

                 <div className="col-md-8 card text-center shadow p-3 mb-5 bg-white rounded">
                     <h2 className='text-center m-5'>MY CART</h2>
                     <table className='table table-bordered table-responsives-sm'>

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

                          {articles.map(item=>{

                            return <tr>
                                <td>{item.nombre}</td>
                                <td>{item.precio}</td>
                                <td><select value={item.cantidad} onChange={(e)=>{dispatch(addToCart(item , e.target.value))}}>
                                    
                                    {[...Array(item.stock).keys()].map((x , i)=>{

                                          return <option value={i+1}>{i+1}</option>

                                    })}
                                    
                                    </select></td>
                                <td>{item.cantidad * item.precio}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </td>
                                </tr>

                          })}

                      </tbody>

                     </table>

                     <hr/>


                     <h2 className='text-center'>SubTotal : {subtotal} €</h2>

                     <hr/>
                 </div>

            </div>

        </div>
    )
}