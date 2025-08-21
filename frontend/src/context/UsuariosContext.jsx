import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const UsuariosContext = createContext();

const API_URL = "http://localhost:3000/usuarios";

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  // Obtener Usuarios (GET)
  const getUsuarios = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsuarios(response.data);
    } catch (err) {
      console.log("Error al obtener los usuarios:", err);
    }
  };

  // Crear Usuario (POST)
  const createUsuarios = async (usuarios) => {
    try {
      console.log("Usuarios a crear:", usuarios);
      const response = await axios.post(API_URL, usuarios);
      setUsuarios((prev) => {
        const existe = prev.find((p) => p.id === response.data.id);
        return existe ? prev : [...prev, response.data];
      });
      console.log("Usuarios creados:", response.data);
    } catch (err) {
      console.log("Error al crear el Usuarios:", err);
    }
  };

  // Editar Usuarios (PUT)
  const editUsuarios = async (id, updatedUsuarios) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedUsuarios);
      setUsuarios((prev) =>
        prev.map((usuarios) =>
          usuarios.id === id ? { ...usuarios, ...updatedUsuarios } : usuarios
        )
      );
      await getUsuarios();
    } catch (err) {
      console.log("Error al editar el Usuarios:", err);
    }
  };

  // Borrar Usuarios (DELETE)
  const deleteUsuarios = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsuarios((prev) => prev.filter((usuarios) => usuarios.id !== id));
    } catch (err) {
      console.log("Error al eliminar el Usuarios:", err);
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        getUsuarios,
        createUsuarios,
        editUsuarios,
        deleteUsuarios,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => useContext(UsuariosContext);
