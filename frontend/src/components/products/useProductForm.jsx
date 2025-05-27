import {useParams, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import { useProducts } from "../../context/ProductContext";
import {useEffect, useState} from "react";


export const useProductForm = ({toastRef}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { productos, createProducto, editProducto } = useProducts(); 

    const [initialValues, setInitialValues] = useState({
      nombre: "",
      precio: 0,
    });

    useEffect(() => {
      if (id) {
        const productToEdit = productos.find((p) => p.id === parseInt(id));
        console.log("Producto a editar:", productToEdit); 
        if (productToEdit) {
          setInitialValues({
            nombre: productToEdit.nombre,
            precio: productToEdit.precio,
          });
        }
      }
    }, [id, productos]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object({
            nombre: Yup.string()
            .required("El nombre es requerido")
            .max(20, "El nombre no puede tener más de 20 caracteres")
            .min(3, "El nombre debe tener al menos 3 caracteres"),
            precio: Yup.number()
            .min(1, "El precio debe ser mayor a 1")
            .required("El precio es requerido")
        }),
        onSubmit: async (values, {setSubmitting}) => {
          try {
            if (id) {
                await editProducto(id, values);
                toastRef?.current?.show({
                    severity: "success",
                    summary: "Actualizado",
                    detail: `El producto ${values.nombre} ha sido actualizado`,
                    life: 3000,
                })
            } else {
                await createProducto(values);
                toastRef?.current?.show({
                    severity: "success",
                    summary: "Creado",
                    detail: `El producto ${values.nombre} ha sido creado`,
                    life: 3000,
                })
            }
            setTimeout(() => {
              navigate("/productos");
            }, 1000);
          } catch (error) {
            console.error("Error al guardar el producto:", error);
            toastRef?.current?.show({
              severity: "error",
              summary: "Error",
              detail: "No se pudo guardar el producto",
              life: 3000,
            });
          }finally{
            setSubmitting(false);
          }
        },
    });

    return {formik, isEditing: !! id};
}