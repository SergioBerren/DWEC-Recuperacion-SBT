import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ServicioFrutas from "../servicios/ServicioFrutas.js";
import Swal from 'sweetalert2';

const Inventario = ({frutasYVerduras, informacion}) => {
    useEffect(() => {
    ServicioFrutas.getAll()
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setTareas(data);
        } else {
          throw new Error("Estructura de datos inválida");
        }
      })
      .catch(error => {
        console.error("Error al cargar las frutas y verduras:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron cargar las frutas y verduras. Intenta más tarde.',
        });
      });
  }, []);
/*
    function buscarProductos(nombre) {
    return informacion.find(frutasYVerduras => frutasYVerduras.nombre.toLowerCase() === nombre.toLowerCase() || null);
  }
  console.log(frutasYVerduras)

  const productos = useParams().nombre  

  let productoInfo = buscarProductos(productos, frutasYVerduras)

  console.log(productoInfo)*/
  return (
    <div>
        <h1>Frutas Y Verduras</h1>
    {/*productoInfo ? (
      <div className="product-card">
        <h1 className="product-title">{productoInfo.nombre}</h1>
        <p className="product-price">{productoInfo.precio} Є</p>
        <img
          className="product-image"
          src={productoInfo.url}
          alt={productoInfo.nombre}
        />
      </div>
    ) : (
      <h1 className="no-product-message">No existe el producto indicado</h1>
    )*/}
  </div>
  );
};

export default Inventario;