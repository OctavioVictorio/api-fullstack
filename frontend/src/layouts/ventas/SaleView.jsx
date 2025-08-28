import React, { useEffect, useRef, useState, useContext } from "react";
import { useSale } from "../../context/SaleContext";
import { useProducts } from "../../context/ProductContext";
import { useUsuarios } from "../../context/UsuariosContext";
import { AuthContext } from "../../context/AuthContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const SaleView = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { sale, getSale, deleteSale } = useSale();
  const { getProductos } = useProducts();
  const { getUsuarios } = useUsuarios();

  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchSale = async () => {
      try {
        await getSale();
        await getProductos();
        await getUsuarios();
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchSale();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-content-center p-4">
        <ProgressSpinner />
      </div>
    );
  }

  const handleEdit = (id) => {
    navigate(`/ventas/editar/${id}`);
  };

  const handleDelete = (id) => {
    confirmDialog({
      message: "¿Eliminar la venta?",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      accept: async () => {
        try {
          await deleteSale(id);
          toast.current.show({
            severity: "success",
            summary: "Eliminado",
            detail: "Venta eliminada correctamente",
            life: 3000,
          });
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo eliminar la venta",
            life: 3000,
          });
        }
      },
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        {user && user.rol === "admin" && (
          <>
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
          </>
        )}
      </div>
    );
  };

  const formatDateBody = (rowData) => {
    return new Date(rowData.fecha).toISOString().split('T')[0];
  };

  const productNameBodyTemplate = (rowData) => {
    return rowData.Producto ? rowData.Producto.nombre : '';
  };
  
  const userNameBodyTemplate = (rowData) => {
  return rowData.Usuario ? rowData.Usuario.nombre : '';
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Card title="Listado de Ventas" className="shadow-4 border-round p-3">
        <div className="flex flex-column md:flex-row md:justify-between md:align-items-center mb-4 gap-4">
          {user && user.rol === "admin" && (
            <div>
              <Button
                label="Crear Venta"
                icon="pi pi-plus"
                className="p-button-info"
                onClick={() => navigate("/ventas/crear")}
              />
            </div>
          )}
          <span className="p-input-icon-left" style={{ minwidth: "300px" }}>
            <InputText
              placeholder="Buscar venta"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full"
            />
          </span>
        </div>
        <DataTable
          value={sale}
          paginator
          rows={5}
          emptyMessage="No hay ventas"
          globalFilter={globalFilter}
          header="Ventas registradas"
          className="p-datatable-striped p-datatable-gridlines"
        >
          <Column field="id" header="ID" sortable />
          <Column header="Producto" body={productNameBodyTemplate} sortable filter />
          <Column header="Usuario" body={userNameBodyTemplate} sortable filter />
          <Column field="cantidad" header="Cantidad" sortable />
          <Column field="total" header="Total" sortable />
          <Column field="fecha" header="Fecha" body={formatDateBody} sortable />
          <Column
            header="Acciones"
            body={actionBodyTemplate}
            exportable={false}
            style={{ width: "120px", textAlign: "center" }}
          />
        </DataTable>
      </Card>
    </div>
  );
};

export default SaleView;