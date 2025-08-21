import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const SaleContext = createContext();

const API_URL = "http://localhost:3000/ventas";

export const SaleProvider = ({ children }) => {
  const [sale, setSale] = useState([]);

  // Obtener Ventas (GET)
  const getSale = async () => {
    try {
      const response = await axios.get(API_URL);
      setSale(response.data);
    } catch (err) {
      console.log("Error al obtener las ventas:", err);
    }
  };

  // Crear Ventas(POST)
  const createSale = async (sale) => {
    try {
      const response = await axios.post(API_URL, sale);
      setSale((prev) => {
        const existe = prev.find((p) => p.id === response.data.id);
        return existe ? prev : [...prev, response.data];
      });
      console.log("Ventas creados:", response.data);
    } catch (err) {
      console.log("Error al crear la venta:", err);
    }
  };

  // Editar Producto (PUT)
  const editSale = async (id, updatedSale) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedSale);
      setSale((prev) =>
        prev.map((sale) =>
          sale.id === id ? { ...sale, ...updatedSale } : sale
        )
      );
      await getSale();
    } catch (err) {
      console.log("Error al editar la venta:", err);
    }
  };

  // Borrar Ventas (DELETE)
  const deleteSale = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setSale((prev) => prev.filter((sale) => sale.id !== id));
    } catch (err) {
      console.log("Error al eliminar la venta:", err);
    }
  };

  return (
    <SaleContext.Provider
      value={{
        sale,
        getSale,
        createSale,
        editSale,
        deleteSale,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};

export const useSale = () => useContext(SaleContext);
