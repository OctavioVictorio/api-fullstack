import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100"
    >
      <Card
        title="Bienvenido a la gestion de productos y usuarios"
        className="w-full md:w-2/3 lg:w-1/2 text-center shadow-4 border-round-2xl"
      >
        <p className="m-0 text-lg text-gray-700">
          Explorá, gestioná y creá tus usuarios y productos con facilidad
        </p>

        <div className="mt-3 flex flex-column md:flex-row md:justify-center gap-3">
          <Button
            label="Ver Usuarios"
            icon="pi pi-unlock"
            className="p-button-outlined p-button-lg p-button-info"
            onClick={() => navigate("/usuarios")}
          />
          <Button
            label="Ver Productos"
            icon="pi pi-shopping-cart"
            className="p-button-outlined p-button-lg p-button-help"
            onClick={() => navigate("/productos")}
          />
        </div>
      </Card>
    </div>
  );
};

export default HomeView;
