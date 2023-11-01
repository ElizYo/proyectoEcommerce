import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsuario, getAllUsuarios } from "../../actions/usuarioActions";
import {Link} from 'react-router-dom';
import Error from "../Error";
import Loader from "../Loader";
import 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function UsuarioList() {
    const getAllUserState = useSelector(state => state.getAllUsersReducer)

    const { usuarios, loading, error } = getAllUserState

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsuarios())
    }, [])

    return (
        <div>
            <h2>Users List</h2>
            <table className='table table-bordered table-responsive-sm'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Fecha Nacimiento</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (<Loader />)}
                    {error && (<Error error='Something went wrong' />)}
                    {usuarios && usuarios.map((usuario) => {
                        return (
                            <tr key={usuario._id}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.fecha_nac.slice(0, 10)}</td>
                                <td>
                                <Link to={`/admin/editusuario/${usuario._id}`}><i className="bi bi-pen"></i></Link></td>
                                <td><i className="bi bi-trash" onClick={()=>{dispatch(deleteUsuario(usuario._id))}}></i></td>
                            </tr>
                        );
                    })}

                </tbody>

            </table>

        </div>
    )
}