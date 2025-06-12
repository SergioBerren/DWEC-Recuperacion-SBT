import '../estilos/DetalleProducto.css';
import {buscarProducto} from "../herramientas/buscarProducto"
import { useParams } from 'react-router-dom';

const DetalleProducto = ({informacion}) => {  
  console.log(informacion)

  const producto = useParams().nombre  

  let productoInfo = buscarProducto(producto, informacion)

  return (
    <div className="product-details-container">
    {productoInfo ? (
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
    )}
  </div>
  );
};

export default DetalleProducto ;
