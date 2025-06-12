import { Link } from 'react-router-dom';
import '../estilos/DetalleCarrito.css';
import React from 'react';

const DetalleCarrito = ({productos, informacion}) => {
  
  function buscarProducto(nombre) {
    return informacion.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase()) || null;
  }

  function incrementar(){
    return console.log("función incrementar")
  }

  function decrementar(producto){
     //productos.map(buscarProducto(producto))
        
    // console.log(productos.map(buscarProducto(producto.nombre)))
    return console.log("función decrementar")
  }


  return (
    <div className="container-detalle">
      <ul> 
        <h2> Productos Seleccionados  </h2>
      {
        productos.map((producto , index)=>{
          let productoInfo = buscarProducto(producto)         
          return (
            
            <li key={index}>
              {producto} : {productoInfo.precio}Є
              <Link to={`/producto/${productoInfo.nombre}`}>
               <img src={productoInfo.url} alt={producto} />
              </Link>
              <button onClick={incrementar}>+</button>
              <button onClick={decrementar}>-</button>
              </li>
          )
        })
      }
      <li className='total'>Numero Elementos : {productos.length}</li>
      </ul>
    </div>
  );
};

export default DetalleCarrito ;
