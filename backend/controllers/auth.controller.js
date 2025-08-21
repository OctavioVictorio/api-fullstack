const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuarios } = require("../models");

const register = async (req, res) => {
    
    const {nombre, email, edad, password} = req.body;
    try{
        const userExit = await Usuarios.findOne({where: {email}});
        if(userExit){
            res.status(400).json({message: "El usuario ya existe"});
        }
        const hashedPassword = await bcrpt.hash(password, 10);
        const newUser = await Usuarios.create({nombre, email, edad, password: hashedPassword});
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
        const token = jwt.sign({id: user.id}, "secreto123", {expiresIn: "1h"});
        res.status(200).json({message: "Inicio de sesión exitoso", token});
    }catch(error){
        res.status(500).json({message: "Error al iniciar sesión", error: error.message});
    }
}

module.exports = {
    login,
    register,
}