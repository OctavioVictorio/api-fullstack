import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSale } from "../../context/SaleContext";
import { useEffect, useState } from "react";

export const useSaleForm = ({ toastRef }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sale, createSale, editSale } = useSale();

  const [initialValues, setInitialValues] = useState({
    producto: "",
    cantidad: 1,
    total: 0,
    fecha: "", // Formato: "YYYY-MM-DD"
  });

  useEffect(() => {
    if (id) {
      const saleToEdit = sale.find((s) => s.id === parseInt(id));
      if (saleToEdit) {
        setInitialValues({
          producto: saleToEdit.producto,
          cantidad: saleToEdit.cantidad,
          total: saleToEdit.total,
          fecha: saleToEdit.fecha,
        });
      }
    }
  }, [id, sale]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      producto: Yup.string().required("El producto es requerido"),
      cantidad: Yup.number()
        .required("La cantidad es requerida")
        .min(1, "Debe ser al menos 1"),
      total: Yup.number()
        .required("El total es requerido")
        .min(0, "No puede ser negativo"),
      fecha: Yup.string()
        .required("La fecha es requerida")
        .matches(
          /^\d{4}-\d{2}-\d{2}$/,
          "Formato de fecha inválido (YYYY-MM-DD)"
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (id) {
          await editSale(parseInt(id), values);
          toastRef?.current?.show({
            severity: "success",
            summary: "Venta actualizada",
            detail: `La venta de ${values.producto} fue actualizada`,
            life: 3000,
          });
        } else {
          await createSale(values);
          toastRef?.current?.show({
            severity: "success",
            summary: "Venta creada",
            detail: `La venta de ${values.producto} fue registrada`,
            life: 3000,
          });
        }
        setTimeout(() => {
          navigate("/ventas");
        }, 1000);
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

  return { formik, isEditing: !!id };
};

