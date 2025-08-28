import React, { useRef } from "react";

import { useSaleForm } from "./useSaleForm";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown"; 
import { InputText } from "primereact/inputtext"; 

const SaleForm = () => {
  const toastRef = useRef(null);
  const { formik, isEditing, productos, usuarios } = useSaleForm({ toastRef });
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
            <ProgressSpinner style={{ width: "40px", height: "40px" }} />
            <div>Guardando...</div>
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="productoId">Producto</label>
            <Dropdown
              id="productoId"
              name="productoId"
              value={formik.values.productoId}
              options={productos}
              optionLabel="nombre"
              optionValue="id"
              onChange={(e) => formik.setFieldValue("productoId", e.value)}
              onBlur={formik.handleBlur}
              placeholder="Seleccione un producto"
              className={
                formik.touched.productoId && formik.errors.productoId
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.productoId && formik.errors.productoId && (
              <small className="p-error">{formik.errors.productoId}</small>
            )}
          </div>
          
          <div className="field">
            <label htmlFor="usuarioId">Usuario</label>
            <Dropdown
              id="usuarioId"
              name="usuarioId"
              value={formik.values.usuarioId}
              options={usuarios}
              optionLabel="nombre"
              optionValue="id"
              onChange={(e) => formik.setFieldValue("usuarioId", e.value)}
              onBlur={formik.handleBlur}
              placeholder="Seleccione un usuario"
              className={
                formik.touched.usuarioId && formik.errors.usuarioId
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.usuarioId && formik.errors.usuarioId && (
              <small className="p-error">{formik.errors.usuarioId}</small>
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
              disabled={true} 
            />
          </div>

          <div className="field">
            <label htmlFor="fecha">Fecha</label>
            <InputText
              id="fecha"
              name="fecha"
              value={formik.values.fecha}
              disabled={true} 
            />
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