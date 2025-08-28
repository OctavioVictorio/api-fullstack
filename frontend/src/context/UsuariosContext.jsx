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
      const nuevosUsuarios = response.data.data;
      if (JSON.stringify(usuarios) !== JSON.stringify(nuevosUsuarios)) {
        setUsuarios(nuevosUsuarios);
      }
    } catch (err) {
      console.log("Error al obtener los usuarios:", err);
    }
  };

  // Crear Usuario (POST)
  const createUsuarios = async (usuario) => {
    try {
      await axios.post(API_URL, usuario);
      await getUsuarios();
    } catch (err) {
      console.error("Error al crear el usuario:", err);
      throw err; 
    }
  };

  // Editar Usuarios (PUT)
  const editUsuarios = async (id, updatedUsuario) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedUsuario);
      await getUsuarios();
    } catch (err) {
      console.error("Error al editar el usuario:", err);
      throw err; 
    }
  };

  // Borrar Usuarios (DELETE)
  const deleteUsuarios = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
      throw err; 
    }
  };

  // Editar Roles
  const updateRol = async (id, newRol) => {
    try {
      await axios.put(`${API_URL}/${id}/rol`, newRol);
      console.log(`Rol del usuario ${id} actualizado a ${newRol.rol}`);
      await getUsuarios(); 
    } catch (err) {
      console.error("Error al actualizar el rol:", err);
      throw err;
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
        updateRol,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => useContext(UsuariosContext);