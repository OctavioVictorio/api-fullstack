import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductsRoutes from "./components/products/index.jsx";
import UsuariosRoutes from "./components/usuarios/index.jsx";
import SaleRoutes from "./components/ventas/index.jsx";

import { ProductProvider } from "./context/ProductContext";
import { UsuariosProvider } from "./context/UsuariosContext.jsx";
import { SaleProvider } from "./context/SaleContext";

import IndexRoutes from "./home/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexRoutes />} />
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
      </Routes>
    </Router>
  );
}

export default App;
