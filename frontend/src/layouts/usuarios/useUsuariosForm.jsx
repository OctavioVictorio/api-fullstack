import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUsuarios } from "../../context/UsuariosContext";
import { useEffect, useState } from "react";

export const useUsuariosForm = ({ toastRef }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuarios, createUsuarios, editUsuarios } = useUsuarios();

  const [initialValues, setInitialValues] = useState({
    nombre: "",
    email: "",
    edad: 0,
  });

  useEffect(() => {
    if (id) {
      const usuariosToEdit = usuarios.find((p) => p.id === parseInt(id));
      console.log("Usuarios a editar:", usuariosToEdit);
      if (usuariosToEdit) {
        setInitialValues({
          nombre: usuariosToEdit.nombre,
          email: usuariosToEdit.email,
          edad: usuariosToEdit.edad,
        });
      }
    }
  }, [id, usuarios]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El nombre es requerido")
        .max(20, "El nombre no puede tener más de 20 caracteres")
        .min(3, "El nombre debe tener al menos 3 caracteres"),
      email: Yup.string()
        .required("El email es requerido")
        .email("El email no es válido"),
      edad: Yup.number()
        .required("La edad es requerida")
        .min(1, "La edad debe ser mayor a 1")
        .max(100, "La edad debe ser menor a 100"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (id) {
          await editUsuarios(id, values);
          toastRef?.current?.show({
            severity: "success",
            summary: "Actualizado",
            detail: `El usuario ${values.nombre} ha sido actualizado`,
            life: 3000,
          })
        } else {
          await createUsuarios(values);
          toastRef?.current?.show({
            severity: "success",
            summary: "Creado",
            detail: `El usuario ${values.nombre} ha sido creado`,
            life: 3000,
          })
        }
        setTimeout(() => {
          navigate("/usuarios");
        }, 1000);

      } catch (error) {
        console.error("Error al guardar el Usuarios:", error);
        toastRef?.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo guardar el usuario",
          life: 3000,
        })
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik, isEditing: !!id };
};
