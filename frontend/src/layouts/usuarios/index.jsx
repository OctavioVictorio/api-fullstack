import React from "react";
import { Routes, Route } from "react-router-dom";
import UsuariosView from "./UsuariosView";
import UsuariosForm from "./UsuariosForm";

const UsuariosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsuariosView />} />
      <Route path="/crear" element={<UsuariosForm />} />
      <Route path="/editar/:id" element={<UsuariosForm />} /> 
    </Routes>
  );
};

export default UsuariosRoutes;
