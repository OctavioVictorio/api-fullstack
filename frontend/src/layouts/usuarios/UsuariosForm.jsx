import React, { useRef } from "react";
import { useUsuariosForm } from "./useUsuariosForm";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown"; 
        
const UsuariosForm = () => {
  const toastRef = useRef(null);
  const { formik, isEditing } = useUsuariosForm({ toastRef });
  const navigate = useNavigate();

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Moderador", value: "moderador" },
    { label: "Cliente", value: "cliente" },
  ];

  return (
    <div className="flex justify-content-center p-4">
      <Toast ref={toastRef} />
      <Card
        title={isEditing ? "Editar Usuarios" : "Crear Usuarios"}
        className="w-full md:w-30rem"
      >
        {formik.isSubmitting && (
          <div className="mb-3 text-center">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".50s"
            />
            <div>Guardando...</div>
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
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
            <label htmlFor="email">
              Email 
            </label>
            <InputText
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.email && formik.errors.email ? "p-invalid" : ""
              }
            />
            {formik.touched.email && formik.errors.email && (
              <small className="p-error">{formik.errors.email}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="edad">
              Edad 
            </label>
            <InputNumber
              id="edad"
              name="edad"
              value={formik.values.edad}
              onValueChange={(e) => formik.setFieldValue("edad", e.value)}
              onBlur={formik.handleBlur}
              className={
                formik.touched.edad && formik.errors.edad ? "p-invalid" : ""
              }
            />
            {formik.touched.edad && formik.errors.edad && (
              <small className="p-error">{formik.errors.edad}</small>
            )}
          </div>
          
          <div className="field">
            <label htmlFor="rol">Rol</label>
            <Dropdown
              id="rol"
              name="rol"
              value={formik.values.rol}
              options={roles}
              onChange={(e) => formik.setFieldValue("rol", e.value)}
              onBlur={formik.handleBlur}
              placeholder="Seleccione un rol"
              className={
                formik.touched.rol && formik.errors.rol ? "p-invalid" : ""
              }
            />
            {formik.touched.rol && formik.errors.rol && (
              <small className="p-error">{formik.errors.rol}</small>
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
              onClick={() => navigate("/usuarios")}
              disabled={formik.isSubmitting}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UsuariosForm;