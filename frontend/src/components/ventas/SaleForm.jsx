// components/ventas/SaleForm.jsx
import React, { useRef } from "react";
import { useSaleForm } from "./useSaleForm";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const SaleForm = () => {
  const toastRef = useRef(null);
  const { formik, isEditing } = useSaleForm({ toastRef });
  const navigate = useNavigate();

  return (
    <div className="flex justify-content-center p-4">
      <Toast ref={toastRef} />
      <Card
        title={isEditing ? "Editar venta" : "Crear venta"}
        className="w-full md:w-30rem"
      >
        {formik.isSubmitting && (
          <div className="mb-3 text-center">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
            <div>Guardando...</div>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="producto">Producto</label>
            <InputText
              id="producto"
              name="producto"
              value={formik.values.producto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.producto && formik.errors.producto
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.producto && formik.errors.producto && (
              <small className="p-error">{formik.errors.producto}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="cantidad">Cantidad</label>
            <InputNumber
              id="cantidad"
              name="cantidad"
              value={formik.values.cantidad}
              onValueChange={(e) =>
                formik.setFieldValue("cantidad", e.value || 0)
              }
              onBlur={formik.handleBlur}
              className={
                formik.touched.cantidad && formik.errors.cantidad
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.cantidad && formik.errors.cantidad && (
              <small className="p-error">{formik.errors.cantidad}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="total">Total</label>
            <InputNumber
              id="total"
              name="total"
              value={formik.values.total}
              onValueChange={(e) => formik.setFieldValue("total", e.value || 0)}
              onBlur={formik.handleBlur}
              className={
                formik.touched.total && formik.errors.total ? "p-invalid" : ""
              }
            />
            {formik.touched.total && formik.errors.total && (
              <small className="p-error">{formik.errors.total}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="fecha">Fecha (YYYY-MM-DD)</label>
            <InputText
              id="fecha"
              name="fecha"
              value={formik.values.fecha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ej: 2025-06-18"
              className={
                formik.touched.fecha && formik.errors.fecha ? "p-invalid" : ""
              }
            />
            {formik.touched.fecha && formik.errors.fecha && (
              <small className="p-error">{formik.errors.fecha}</small>
            )}
          </div>

          <div className="flex justify-content-between mt-3">
            <Button
              className="p-button-success"
              label={isEditing ? "Actualizar" : "Crear"}
              icon="pi pi-check"
              type="submit"
              disabled={formik.isSubmitting}
            />
            <Button
              className="p-button-danger"
              label="Cancelar"
              icon="pi pi-times"
              type="button"
              onClick={() => navigate("/ventas")}
              disabled={formik.isSubmitting}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SaleForm;
