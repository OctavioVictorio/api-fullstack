// src/layouts/home/HomeView.jsx

import React from 'react';
import { Card } from 'primereact/card';

const HomeView = () => {
return (
<div className="p-4 flex flex-column align-items-center justify-content-center h-full">
    <Card
    title="Bienvenido a la gestión de productos y usuarios"
    className="text-center shadow-4"
    >
    <p className="m-0">
        (aplicación fullstack en JavaScript donde el frontend (React) consume los datos expuestos por el backend (Express), permitiendo realizar CRUDs completos)
    </p>
    </Card>
</div>
);
};

export default HomeView;

