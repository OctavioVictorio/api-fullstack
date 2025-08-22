import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Componentes de las vistas
import Home from "./layouts/home/index.jsx";
import ProductsRoutes from "./layouts/products/index.jsx";
import UsuariosRoutes from "./layouts/usuarios/index.jsx";
import SaleRoutes from "./layouts/ventas/index.jsx";
import LoginForm from "./layouts/auth/LoginForm.jsx";
import RegisterForm from "./layouts/auth/RegisterForm.jsx";
import Navbar from "./layouts/home/Navbar.jsx";

// Contextos
import { ProductProvider } from "./context/ProductContext";
import { UsuariosProvider } from "./context/UsuariosContext.jsx";
import { SaleProvider } from "./context/SaleContext";
import { AuthProvider } from "./context/AuthContext.jsx";

// Componentes de protección
import PrivateRoute from "./utils/PrivateRoute.jsx";
import PublicRoute from "./utils/PublicRoute.jsx";


function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar />
        <Routes>
          {/* Rutas Públicas */}
          <Route element={<PublicRoute />}>
            <Route path="/inicio-sesion" element={<LoginForm />} />
            <Route path="/registro" element={<RegisterForm />} />
          </Route>

          {/* Rutas Públicas accesibles por todos (sin redirección) */}
          <Route path="/" element={<Home />} />
          
          {/* Rutas Privadas */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/productos/*"
              element={
                <ProductProvider>
                  <ProductsRoutes />
                </ProductProvider>
              }
            />
            <Route
              path="/usuarios/*"
              element={
                <UsuariosProvider>
                  <UsuariosRoutes />
                </UsuariosProvider>
              }
            />
            <Route
              path="/ventas/*"
              element={
                <SaleProvider>
                  <SaleRoutes />
                </SaleProvider>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;