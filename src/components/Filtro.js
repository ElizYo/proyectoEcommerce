import React, { useState } from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getProductsByText } from "../actions/productosActions";

export default function Filtro() {

    const dispatch = useDispatch();

    /*function executeFilters(me) {

        useEffect(() => {
          dispatch(getProductsByText("Samsung"));
        }, []);
        
        console.log()
    }*/

    return (
        <div>
            <div className="row">
                <div className="col-m-2">
                    <input id="search" name="search" type="text" placeholder='search products' className='form-control'/>
                </div>
            </div>

        </div>
    )
}