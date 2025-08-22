const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuarios } = require("../models");

const register = async (req, res) => {
    
    const {nombre, email, edad, password, rol} = req.body;
    try{
        const userExit = await Usuarios.findOne({where: {email}});
        if(userExit){
            res.status(400).json({message: "El usuario ya existe"});
        }
        const hashedPassword = await bcrpt.hash(password, 10);
        const newUser = await Usuarios.create(
            {
                nombre, 
                email, 
                edad, 
                password: hashedPassword,
                rol: rol || "cliente" // Asignar rol por defecto si no se especifica
            }
        );
        res.status(201).json({message: "Usuario creado correctamente", newUser});
    }catch(error){
        res.status(500).json({message: "Error al crear el usuario", error: error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const userExist = await Usuarios.findOne({where: {email}});
        if(!userExist){
            return res.status(400).json({message: "El usuario no existe"});
        }
        const validPassword = await bcrpt.compare(password, userExist.password);
        if(!validPassword){
            return res.status(403).json({message: "Contraseña incorrecta"});
        }
        const token = jwt.sign({id: userExist.id, rol: userExist.rol}, "secreto123", {expiresIn: "1h"});

        const user = {
            id: userExist.id,
            nombre: userExist.nombre,
            email: userExist.email,
            edad: userExist.edad,
            rol: userExist.rol
        };

        res.status(200).json({message: "Inicio de sesión exitoso", token, user: user});
    }catch(error){
        res.status(500).json({message: "Error al iniciar sesión", error: error.message});
    }
}

module.exports = {
    login,
    register,
}