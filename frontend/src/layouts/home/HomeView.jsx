import { useContext } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HomeView = () => {
    const { user } = useContext(AuthContext); 
    
    return (
        <div
        className="p-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100"
        >
            <Card
                title="Bienvenido a la gestion de productos y usuarios"
                className="w-full md:w-2/3 lg:w-1/2 text-center shadow-4 border-round-2xl"
            >
                {user ?
                    <div className="mt-3 flex flex-column md:flex-row md:justify-center gap-3">
                        <p className="m-0 text-lg text-gray-700">
                            Explorá, gestioná y creá tus usuarios y productos con facilidad
                        </p>
                    </div>
                :
                    <div>
                        <p className="text-gray-600">Por favor, inicia sesión para continuar.</p>
                    </div>
                }
            </Card>
        </div>
    );
};

export default HomeView;