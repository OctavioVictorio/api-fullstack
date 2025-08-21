import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ProductProvider } from "./context/ProductContext";
import { UsuariosProvider } from "./context/UsuariosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <UsuariosProvider>
        <App />
      </UsuariosProvider>
    </ProductProvider>
  </React.StrictMode>
);
