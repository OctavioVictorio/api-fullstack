const mysql = require("mysql2/promise");

const crearBaseDeDatos = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "octavio123",
        });
        await connection.query("CREATE DATABASE IF NOT EXISTS octavio_db");
        console.log("La base de datos ya se creo o ya existe");
        await connection.end();
    } catch (error) {
        console.error("Error al crear la base de datos:", error.message);
    }
};

crearBaseDeDatos();
