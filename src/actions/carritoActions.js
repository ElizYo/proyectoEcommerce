export const carritoActions=(product , cantidad)=>(dispatch, getState)=>{


    const carritoArticulos = {

      _id : product._id ,
      nombre : product.nombre, 
      precio : product.precio ,
      stock : product.stock , 
      cantidad : cantidad

    }

    console.log("Datos action carrito", carritoArticulos);

    dispatch({type : 'ADD_TO_CART' , payload : carritoArticulos})

    localStorage.setItem('articles', JSON.stringify(getState().getcarritoReducer.articles));

}
