import React, {useRef, useEffect, useState} from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import { useProducts } from "../../context/ProductContext";
import { exportToPdf } from "../../utils/ExportToPdf";

const ProductView = () => {
  const toast = useRef(null);
  const navigate = useNavigate();

  const { productos, getProductos, deleteProducto} = useProducts();
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    getProductos(); 
  }, []);

  const handleEdit = (id) => {
    navigate(`/productos/editar/${id}`);
  };

  const handleDelete = (id) => {
    confirmDialog({
      message: "¿Eliminar el producto?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      accept: async () => {
        try {
          await deleteProducto(id);
          toast.current.show({
            severity: "success",
            summary: "Eliminado",
            detail: "Producto eliminado correctamente",
            life: 3000,
          });
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo eliminar el producto",
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
    { field: "precio", header: "Precio" }
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
      <Card title="Listado de Productos" className="shadow-4 border-round p-3">
        <div className="flex flex-column md:flex-row md:justify-between md:align-items-center mb-4 gap-4">
          <div>
            <Button
              label="Crear Producto"
              icon="pi pi-plus"
              className="p-button-info"
              onClick={() => navigate("/productos/crear")}
            />
          </div>
          <span className="p-input-icon-right">
            <InputText
              placeholder=" Buscar producto"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full"
            />
          </span>
        </div>
        <DataTable
          value={productos}
          emptyMessage="No hay productos"
          paginator
          rows={5}
          className="p-datatable-sm"
        >
          <column field="id" header="ID" sortable style={{ width: "70px" }} />
          <Column field="nombre" header="Nombre" sortable />
          <Column field="precio" header="Precio" sortable />
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
          onClick={() => exportToPdf(productos, "Productos", columns)}
        />
      </Card>
    </div>
  );
};

export default ProductView;