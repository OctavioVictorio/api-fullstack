import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSale } from "../../context/SaleContext";
import { useProducts } from "../../context/ProductContext";
import { useUsuarios } from "../../context/UsuariosContext";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const useSaleForm = ({ toastRef }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sale, createSale, editSale, getSale } = useSale();
  const { productos, getProductos } = useProducts();
  const { usuarios, getUsuarios } = useUsuarios();
  const { user } = useContext(AuthContext);

  const [initialValues, setInitialValues] = useState({
    productoId: "",
    usuarioId: "",
    cantidad: 1,
    total: 0,
    fecha: "",
  });


  useEffect(() => {
    getProductos();
    getUsuarios();
    getSale(); 
  }, []);

  useEffect(() => {
    if (id && sale.length > 0) {
      const ventaExistente = sale.find((v) => v.id === parseInt(id));
      if (ventaExistente) {
        setInitialValues({
          productoId: ventaExistente.Producto?.id || "",
          usuarioId: ventaExistente.Usuario?.id || "",
          cantidad: ventaExistente.cantidad,
          total: ventaExistente.total,
          fecha: ventaExistente.fecha.split("T")[0],
        });
      }
    }
  }, [id, sale]);

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues,
    validationSchema: Yup.object({
      productoId: Yup.number().required("El producto es requerido"),
      usuarioId: Yup.number().required("El usuario es requerido"),
      cantidad: Yup.number()
        .required("La cantidad es requerida")
        .min(1, "Debe ser al menos 1"),
      total: Yup.number()
        .required("El total es requerido")
        .min(0, "No puede ser negativo"),
      fecha: Yup.string()
        .required("La fecha es requerida")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido (YYYY-MM-DD)"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (id) {
          await editSale(parseInt(id), values);
          toastRef?.current?.show({
            severity: "success",
            summary: "Venta actualizada",
            detail: `La venta fue actualizada`,
            life: 3000,
          });
        } else {
          await createSale(values);
          toastRef?.current?.show({
            severity: "success",
            summary: "Venta creada",
            detail: `La venta fue registrada`,
            life: 3000,
          });
        }
        setTimeout(() => navigate("/ventas"), 1000);
      } catch (error) {
        console.error("Error al guardar la venta:", error);
        toastRef?.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo guardar la venta",
          life: 3000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const productoSeleccionado = productos.find(
      (p) => p.id === formik.values.productoId
    );
    if (productoSeleccionado) {
      const total = productoSeleccionado.precio * formik.values.cantidad;
      formik.setFieldValue("total", total);
    } else {
      formik.setFieldValue("total", 0);
    }
  }, [formik.values.productoId, formik.values.cantidad, productos]);

  useEffect(() => {
    if (!id) {
      const fechaHoy = new Date().toISOString().split("T")[0];
      formik.setFieldValue("fecha", fechaHoy);
      if (user?.id) {
        formik.setFieldValue("usuarioId", user.id);
      }
    }
  }, [id, user]);

  const isEditing = !!id;
  return { formik, isEditing, productos, usuarios };
};
