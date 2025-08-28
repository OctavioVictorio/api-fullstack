import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="p-4 flex justify-content-between align-items-center bg-gray-800 text-white shadow-lg">
            {/* Lado Izquierdo: Botones de navegación */}
            <div className="flex align-items-center gap-2">
                <Link to="/" className="no-underline">
                    <Button
                        label="Mi App"
                        icon="pi pi-home"
                        className="p-button-outlined p-button-sm"
                    />
                </Link>

                {user && (
                    <div className="flex align-items-center gap-2">
                        <Link to="/productos" className="no-underline">
                            <Button
                                label="Productos"
                                icon="pi pi-box"
                                className="p-button-outlined p-button-secondary p-button-sm"
                            />
                        </Link>
                        <Link to="/ventas" className="no-underline">
                            <Button
                                label="Ventas"
                                icon="pi pi-chart-line"
                                className="p-button-outlined p-button-secondary p-button-sm"
                            />
                        </Link>
                    </div>
                )}
            </div>

            {/* Lado Derecho: Botones de usuario o de autenticación */}
            <div className="flex align-items-center gap-2">
                {user ? (
                    <>
                        {user.rol === "admin" && (
                            <Link to="/usuarios" className="no-underline">
                                <Button
                                    label="Panel Admin"
                                    icon="pi pi-shield"
                                    className="p-button-outlined p-button-info p-button-sm"
                                />
                            </Link>
                        )}
                        <span className="text-sm mr-2">{user.nombre}</span>
                        <Button
                            label="Cerrar Sesión"
                            icon="pi pi-sign-out"
                            className="p-button-danger p-button-sm"
                            onClick={logout}
                        />
                    </>
                ) : (
                    <>
                        <Link to="/inicio-sesion" className="no-underline">
                            <Button
                                label="Iniciar Sesión"
                                icon="pi pi-sign-in"
                                className="p-button-success p-button-sm"
                            />
                        </Link>
                        <Link to="/registro" className="no-underline">
                            <Button
                                label="Registrarse"
                                icon="pi pi-user-plus"
                                className="p-button-warning p-button-sm"
                            />
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;