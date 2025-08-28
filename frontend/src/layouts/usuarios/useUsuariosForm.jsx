import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUsuarios } from "../../context/UsuariosContext";
import { useEffect, useState } from "react";

export const useUsuariosForm = ({ toastRef }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuarios, createUsuarios, editUsuarios, getUsuarios } = useUsuarios();
  const isEditing = !!id;

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      edad: 0,
      rol: "cliente", 
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El nombre es requerido")
        .max(20, "El nombre no puede tener más de 20 caracteres")
        .min(3, "El nombre debe tener al menos 3 caracteres"),
      email: Yup.string()
        .required("El email es requerido")
        .email("El email no es válido"),
      edad: Yup.number()
        .required("La edad es requerida")
        .min(1, "La edad debe ser mayor a 1")
        .max(100, "La edad debe ser menor a 100"),
      rol: Yup.string()
        .oneOf(["admin", "moderador", "cliente"], "El rol no es válido") 
        .required("El rol es requerido"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEditing) {
          await editUsuarios(parseInt(id), values);
          toastRef?.current?.show({
            severity: "success",
            summary: "Actualizado",
            detail: `El usuario ${values.nombre} ha sido actualizado`,
            life: 3000,
          });
        } else {
          await createUsuarios(values);
          toastRef?.current?.show({
            severity: "success",
            summary: "Creado",
            detail: `El usuario ${values.nombre} ha sido creado`,
            life: 3000,
          });
        }
        setTimeout(() => {
          navigate("/usuarios");
        }, 1000);
      } catch (error) {
        console.error("Error al guardar el usuario:", error);
        toastRef?.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo guardar el usuario",
          life: 3000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    getUsuarios();

    if (isEditing && usuarios && usuarios.length > 0) {
      const userToEdit = usuarios.find((u) => u.id === parseInt(id));
      if (userToEdit) {
        formik.setValues({
          nombre: userToEdit.nombre,
          email: userToEdit.email,
          edad: userToEdit.edad,
          rol: userToEdit.rol,
        });
      }
    }
  }, [id, isEditing, usuarios]);

  return { formik, isEditing };
};