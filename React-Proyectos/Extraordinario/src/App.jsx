import { useEffect, useState } from 'react'
import MenuSuperior from './componentes/menu'
import ListaImagenes from './componentes/cuerpo'
import DetalleCarrito from './componentes/DetalleCarrito'

  import { ToastContainer, toast } from 'react-toastify';

import { Routes, Route } from 'react-router-dom';
import Pagina404 from './componentes/Pagina404';
import DetalleProducto from './componentes/DetalleProducto';
import UseStorageState from './servicios/UseStorageState';
import { AuthProvider } from './Login/AuthProvider';
import Login from './Login/login';
import RutasProtegidas from './Login/RutasProtegidas';
import ServicioUsuario from './servicios/ServicioUsuario';
import Inventario from './componentes/Inventario';


function App() {

  const [informacion,setInformacion] = useState([])

  useEffect(() => {
    ServicioUsuario.getAllFrutas()
      .then((response) => {
        setInformacion(response.data);
      })
      .catch((error) => {
        
        Swal.fire({
          title: "¿Tienes Internet?",
          text: "No consigo descargar las aficiones :(",
          icon: "question"
        });
      });
  }, []);



  const [total, setTotal] = UseStorageState("total", 0); // Estado para el importe total
  const [productos, setProductos] = UseStorageState("productos", []); // Lista de productos del carrrito

  return (

    <AuthProvider>

      <div className="App">
        <header className="App-header">
          {/* Pasar el total al menú superior */}
          <MenuSuperior
            total={total}
            productos={productos}
          />
        </header>
        <main>
          <Routes>
            {/* Ruta principal con ListaImagenes */}
            <Route
              path="/"
              element={
                <RutasProtegidas>
                  <ListaImagenes total={total} setTotal={setTotal} productos={productos} setProductos={setProductos} informacion={informacion} />
                  <ToastContainer />
                </RutasProtegidas>
              }
            />

            <Route
              path="/login"
              element={<Login/>}
            />

          
            
            <Route path="/detalle-carrito" element={
               <RutasProtegidas>
              <DetalleCarrito productos={productos} informacion={informacion} />
              </RutasProtegidas>
              } />

            <Route path="/producto/:nombre" element={
               <RutasProtegidas>
              <DetalleProducto informacion={informacion} />
              </RutasProtegidas>
              } />
              
              <Route path="/inventario" element={
                <RutasProtegidas>
                  <Inventario />
                </RutasProtegidas>
              }/>

            <Route path="*" element={<Pagina404 />} />



          </Routes>
        </main>
      </div>
    </AuthProvider>

  );
}

export default App
