// components/ventas/SaleView.jsx
import React, { useEffect } from "react";
import { useSale } from "../../context/SaleContext";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const SaleView = () => {
  const { sale, getSale, deleteSale } = useSale();
  const navigate = useNavigate();

  useEffect(() => {
    getSale();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta venta?")) {
      deleteSale(id);
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          onClick={() => navigate(`/ventas/edit/${rowData.id}`)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData.id)}
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-3">
        <h2>Listado de Ventas</h2>
        <Button
          label="Nueva Venta"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => navigate("/ventas/new")}
        />
      </div>

      <Card>
        <DataTable value={sale} paginator rows={5} responsiveLayout="scroll">
          <Column field="id" header="ID" />
          <Column field="producto" header="Producto" />
          <Column field="cantidad" header="Cantidad" />
          <Column field="total" header="Total" />
          <Column field="fecha" header="Fecha" />
          <Column body={actionTemplate} header="Acciones" />
        </DataTable>
      </Card>
    </div>
  );
};

export default SaleView;
    