import React, { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import { useUsuarios } from "../../context/UsuariosContext";
import { exportToPdf } from "../../utils/ExportToPdf";

const UsuariosView = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  
  const { usuarios, getUsuarios, deleteUsuarios } = useUsuarios();
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    getUsuarios();
  }, []);

  const handleEdit = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  const handleDelete = (id) => {
    confirmDialog({
      message: "¿Eliminar el usuario?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      accept: async () => {
        try {
          await deleteUsuarios(id);
          toast.current.show({
            severity: "success",
            summary: "Eliminado",
            detail: "Usuario eliminado correctamente",
            life: 3000,
          });
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo eliminar el usuario",
            life: 3000,
          });
        }
      },
    });
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info"
        onClick={() => handleEdit(rowData.id)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  const columns = [
    { field: "id", header: "ID" },
    { field: "nombre", header: "Nombre" },
    { field: "email", header: "Email" },
    { field: "edad", header: "Edad" },
  ];

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <Button
        label="Inicio"
        icon="pi pi-home"
        className="p-button"
        onClick={() => navigate("/")}
      />
      <Card title="Listado de Usuarios" className="shadow-4 border-round p-3">
        <div className="flex flex-column md:flex-row md:justify-between md:align-items-center mb-4 gap-4">
          <div>
            <Button
              label="Crear Usuarios"
              icon="pi pi-plus"
              className="p-button-info"
              onClick={() => navigate("/usuarios/crear")}
            />
          </div>
          <span className="p-input-icon-left" style={{ minwidth: "300px" }}>
            <InputText
              placeholder=" Buscar usuario"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full"
            />
          </span>
        </div>

        <DataTable
          value={usuarios}
          paginator
          rows={5}
          emptyMessage="No hay usuarios"
          globalFilter={globalFilter}
          header="Usuarios registrados"
          className="p-datatable-striped p-datatable-gridlines"
        >
          <column field="id" header="ID" sortable style={{ width: "70px" }} />
          <Column field="nombre" header="Nombre" sortable />
          <Column field="email" header="Email" sortable />
          <Column
            field="edad"
            header="Edad"
            sortable
            style={{ width: "100px" }}
          />
          <Column
            header="Acciones"
            body={actionBodyTemplate}
            exportable={false}
            style={{ width: "120px", textAlign: "center" }}
          />
        </DataTable>
        <Button
          label="Exportar a PDF"
          icon="pi pi-file-pdf"
          className="p-button-help"
          onClick={() => exportToPdf(usuarios, "Usuarios", columns)}
        />
      </Card>
    </div>
  );
};

export default UsuariosView;
