const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Usuarios } = require("../models");

const { sendEmail } = require('../utils/nodemailer')
const crypto = require('crypto')


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
                rol: rol || "cliente" 
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
        if(!validPassword) return res.status(403).json({message: "Contraseña incorrecta"});
        
        const user = {
            id: userExist.id,
            nombre: userExist.nombre,
            email: userExist.email,
            edad: userExist.edad,
            rol: userExist.rol
        }
        const token = jwt.sign({user: user}, "secreto123", {expiresIn: "1h"});

        res.status(200).json({message: "Inicio de sesión exitoso", token});
    }catch(error){
        res.status(500).json({message: "Error al iniciar sesión", error: error.message});
    }
}

const resetTokens = new Map()

const resetEmailTemplate = ({ nombre, resetUrl }) => {
    return `
    <div style="max-width: 520px; margin:0; padding: 20px;">
        <h2>Recupera tu contraseña</h2>
        <p>Hola ${nombre || ''}, recibimos tu solicitud para restablecer la contraseña.</p>
        <p>Hace click en el boton para continuar.</p>
        <p>
            <a href=${resetUrl}>
                Cambiar contraseña
            </a>
        </p>
        <p>Si no fuiste vos, podes ignorar el mensaje</p>
    </div>
    `
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await Usuarios.findOne({ where: { email } })
        if (!user) return res.status(400).json({ message: 'El usuario no existe' })

        const rawToken = crypto.randomBytes(32).toString('hex')
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
        const expiresAt = Date.now() + 15 * 60 * 1000

        resetTokens.set(user.id, { tokenHash, expiresAt })

        const resetUrl = `${process.env.FRONT_URL || 'http://localhost:5173'}/recuperar-contraseña?token=${rawToken}&id=${user.id}`
        await sendEmail({
            to: user.email,
            subject: 'Recuperación de contraseña',
            html: resetEmailTemplate({ nombre: user.nombre, resetUrl })
        })

        return res.status(201).json({ message: 'Email de recuperación enviado' })

    } catch (error) {
        return res.status(500).json({ message: 'Error al enviar el mail', error: error.message })
    }
}

const resetPassword = async (req, res) => {
    const { id, token, password } = req.body
    if (!id || !token || !password) return res.status(400).json({ message: 'Faltan datos' })
    try {
        const entry = resetTokens.get(Number(id))
        if (!entry) return res.status(400).json({ message: 'Token invalido' })

        if (entry.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Token invalido' })
        }

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

        if (tokenHash !== entry.tokenHash) return res.status(400).json({ message: 'Token invalido' })

        const user = await Usuario.findByPk(id)
        if (!user) return res.status(400).json({ message: 'El usuario no existe' })

        user.password = await bcrypt.hash(password, 10)
        await user.save()

        resetTokens.delete(Number(id))

        return res.status(201).json({ message: 'Contraseña actualizada exitosamente' })

    } catch (error) {
        return res.status(500).json({ message: 'Error al resetear contraseña' })
    }
}


module.exports = {
    login,
    register,
    forgotPassword, 
    resetPassword 
}