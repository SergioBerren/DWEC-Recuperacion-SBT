import '../estilos/cuerpo.css';
import { useAuth } from '../Login/AuthProvider.jsx';
import { ToastContainer, toast } from 'react-toastify';

// const {user} = useAuth();
// Datos de imágenes

const notify = () => toast.warn(`Uso de Storage: se ha modificado el carrito`);
// Componente ListaImagenes
const ListaImagenes = ({ total, setTotal , productos, setProductos , informacion}) => {
  
  const AnadirProducto = (nombre, precio) => {    
    
    setTotal(total + precio);    
    
    setProductos([...productos, nombre]);   
   notify()
  };

  return (
    <div className="container">
      {informacion.map((item, index) => (
        <div key={index}>
          <img src={item.url} alt="imagen" />
          <h3>{item.nombre}</h3>
          <p>Precio: {item.precio} Euros</p>
          <button onClick={() => AnadirProducto(item.nombre, item.precio)}>
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListaImagenes;
