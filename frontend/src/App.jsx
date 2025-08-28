import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layouts/home/index';

import ProductRoutes from './layouts/products/index';
import { ProductProvider } from './context/ProductContext';

import UsuariosRoutes from './layouts/usuarios/index';
import { UsuariosProvider } from './context/UsuariosContext'

import SalesRoutes from './layouts/ventas/index';
import { SaleProvider } from './context/SaleContext';

import { AuthProvider } from './context/AuthContext';
import LoginForm from './layouts/auth/LoginForm';
import RegisterForm from './layouts/auth/RegisterForm';

import PrivateRoute from './utils/PrivateRoute';

import Navbar from './components/Navbar';

import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
        <AuthProvider>
          <Navbar />
          <Fragment>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/inicio-sesion' element={<LoginForm/>}/>
              <Route path='/registro' element={<RegisterForm/>}/>
              <Route
                path="/productos/*"
                element={
                  <PrivateRoute>
                    <ProductProvider>
                      <ProductRoutes />
                    </ProductProvider>
                  </PrivateRoute>
                }
              />
              <Route
                path="/usuarios/*"
                element={
                  <PrivateRoute>
                    <UsuariosProvider>
                      <UsuariosRoutes />
                    </UsuariosProvider>
                  </PrivateRoute>
                }
              />
              <Route
                path="/ventas/*"
                element={
                  <PrivateRoute>
                    <ProductProvider>
                      <UsuariosProvider>
                        <SaleProvider>
                          <SalesRoutes />
                        </SaleProvider>
                      </UsuariosProvider>
                    </ProductProvider>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Fragment>
        </AuthProvider>
      </Router>
  );
}

export default App;