import React from "react";
import { Routes, Route } from "react-router-dom";
import SaleView from "./SaleView";
import SaleForm from "./SaleForm";

const SaleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SaleView />} />
      <Route path="/crear" element={<SaleForm />} />
      <Route path="/editar/:id" element={<SaleForm />} />
    </Routes>
  );
};

export default SaleRoutes;
