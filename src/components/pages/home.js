import React from "react";
import Product from './product';
//import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductos } from "../../actions/productosActions";
import '../../style/index.scss';

export default function Home() {

  const getallproductsstate = useSelector(
    (state) => state.getAllProductosReducer
  );

  const { products } = getallproductsstate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductos());
  }, []);

  /*
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos/obtenertodosproductos').then(res =>{
      console.log(res.json);
      setProducts(res.data);
    }).catch(err => console.log(err));
  }, []);*/

  return <div>
    <div className='row justify-content-center'>
    {products && products.length && (products.map(product => {
        return <div className="col-md-3 m-5 card p-2" key={product._id}> 
          <Product product={product}/>
          </div>
      }))

      }
    </div>
  </div>
}