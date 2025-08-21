import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const ProductContext = createContext();

const API_URL = "http://localhost:3000/productos";

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  
  // Obtener Productos (GET)
  const getProductos = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data);
    } catch (err) {
      console.log("Error al obtener los productos:", err);
    }
  };

  // Crear Producto (POST)
  const createProducto = async (producto) => {
    try {
      const response = await axios.post(API_URL, producto);
      setProductos((prev)=>{
        const existe = prev.find((p) => p.id === response.data.id);
        return existe ? prev : [...prev, response.data];
      });
      console.log("Productos creados:", response.data);
    } catch (err) {
      console.log("Error al crear el producto:", err);
    }
  };

  // Editar Producto (PUT)
  const editProducto = async (id, updatedProducto) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedProducto);
      setProductos((prev) =>
        prev.map((producto) =>
          producto.id === id ? { ...producto, ...updatedProducto } : producto
        )
      );
      await getProductos()
    } catch (err) {
      console.log("Error al editar el producto:", err);
    }
  };

  // Borrar Producto (DELETE)
  const deleteProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductos((prev) => prev.filter((producto) => producto.id !== id));
    } catch (err) {
      console.log("Error al eliminar el producto:", err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        getProductos,
        createProducto,
        editProducto,
        deleteProducto,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);