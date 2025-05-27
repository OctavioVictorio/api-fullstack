import React, { useRef } from "react";

import { useProductForm } from "./useProductForm";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

const ProductForm = () => {
  const toastRef = useRef(null);
  const { formik, isEditing } = useProductForm( {toastRef} );
  const navigate = useNavigate();
  return (
    <div className="flex justify-content-center p-4">
      <Toast ref={toastRef} />
      <Card
        title={isEditing ? "Editar Producto" : "Crear Producto"}
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
            <label htmlFor="nombre">
              Nombre <span className="p-error">*</span>
            </label>
            <InputText
              id="nombre"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.nombre && formik.errors.nombre ? "p-invalid" : ""
              }
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <small className="p-error">{formik.errors.nombre}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="precio">
              Precio <span className="p-error">*</span>
            </label>
            <InputNumber
              id="precio"
              name="precio"
              value={formik.values.precio ?? 0}
              onValueChange={(e) => formik.setFieldValue("precio", e.value)}
              onBlur={formik.handleBlur}
              className={
                formik.touched.precio && formik.errors.precio ? "p-invalid" : ""
              }
            />
            {formik.touched.precio && formik.errors.precio && (
              <small className="p-error">{formik.errors.precio}</small>
            )}
          </div>
          
          <div className="flex justify-content-between">
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
              onClick={() => navigate("/productos")}
              disabled={formik.isSubmitting}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
