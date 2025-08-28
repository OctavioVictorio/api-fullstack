const {Usuarios} = require("../models/");

const { Op } = require("sequelize"); 

// Función para validar formato de email
function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 1) GET /usuarios
// Devuelve el listado completo de usuarios.
const getUsuarios = async (request, response) => {
    try{
      const usuarios = await Usuarios.findAll();
      response.json({data: usuarios, status: 200, message: "usuarios obtenidos de manera exitosa"});
    }catch (err) {
      response.status(500).json({ message: "Error al obtener los usuarios"});
    }
  }

// 2) GET /usuarios/:id
// Devuelve un usuario por su ID.
// Si no se encuentra, devolver un error 404.
const getUsuariosById = async (request, response) => {
    try{
      const usuario = await Usuarios.findByPk(request.params.id);
      if (!usuario) {
        return response.json({ status: 404, message: "usuario no encontrado" });
      }
      response.json({
        data: usuario,
        status: 200,
        message: "usuario obtenido de manera exitosa",
      });
    }catch (err) {
      response.status(500).json({ message: "Error al obtener el usuario", error: err.message });
    }
  }

// 3) POST /usuarios
// Recibe un nuevo usuario por req.body.
// El usuario debe tener al menos:
//  nombre, email, edad.
// Asignar un id único automáticamente.
// Devolver el usuario creado.
const createUsuario = async (request, response) => {
  const { nombre, email, edad } = request.body;
  try{
      if (!nombre || !email || edad === undefined) {
        return response.status(400).json({
          status: 400,
          message: "Faltan datos obligatorios (nombre, email o edad).",
        });
      }
      if (!emailValido(email)) {
        return response.status(400).json({
          status: 400,
          message: "El email no tiene un formato valido.",
        });
      }
      if (typeof edad !== "number" || edad < 0) {
        return response.status(400).json({
          status: 400,
          message: "La edad debe ser un número valido mayor que 0.",
        });
      }
      const emailExistente = await Usuarios.findOne({ where: { email: email } });
      if (emailExistente) {
        return response.status(400).json({
          status: 400,
          message: "El email ya esta en uso.",
        });
      }
      const nuevoUsuario = await Usuarios.create({ nombre, email, edad });
      response.status(201).json({
        message: "usuario creado de manera exitosa",
        data: nuevoUsuario,
      });
  }catch (err) {
      response.status(500).json({ message: "Error al crear el usuario", error: err.message });
      }  
  }

// 4) PUT /usuarios/:id
// Actualiza los datos de un usuario existente.
// Validar que el usuario exista antes de modificarlo.
// Devolver el usuario actualizado.
const updateUsuario = async (request, response) => {
    try {
        const usuario = await Usuarios.findByPk(request.params.id);
        if (!usuario) {
            return response.status(404).json({
                status: 404,
                message: "usuario no encontrado"
            });
        }

        const { nombre, email, edad, rol } = request.body;
        
        // 1. Validar si el email ya está en uso por otro usuario.
        if (email && email !== usuario.email) {
            if (!emailValido(email)) {
                return response.status(400).json({
                    status: 400,
                    message: "El email no tiene un formato válido."
                });
            }

            const emailExistente = await Usuarios.findOne({
                where: {
                    email: email,
                    id: { [Op.ne]: usuario.id } 
                }
            });
            if (emailExistente) {
                return response.status(400).json({
                    status: 400,
                    message: "El email ya está en uso por otro usuario."
                });
            }
        }

        // 2. Validar que la edad sea un número válido.
        if (edad !== undefined && (typeof edad !== "number" || edad < 0)) {
            return response.status(400).json({
                status: 400,
                message: "La edad debe ser un número válido mayor que 0."
            });
        }
        
        // 3. Validar que el rol sea uno de los permitidos.
        const rolesValidos = ["admin", "moderador", "cliente"];
        if (rol && !rolesValidos.includes(rol)) {
            return response.status(400).json({
                status: 400,
                message: "Rol inválido. Los roles permitidos son: admin, moderador, cliente."
            });
        }
        
        // 4. Actualizar los datos del usuario.
        usuario.nombre = nombre || usuario.nombre;
        usuario.email = email || usuario.email;
        usuario.edad = edad || usuario.edad;
        usuario.rol = rol || usuario.rol; 
        
        await usuario.save();
        
        response.status(200).json({
            data: usuario,
            status: 200,
            message: "usuario actualizado de manera exitosa",
        });

    } catch (err) {
        response.status(500).json({
            message: "Error al actualizar el usuario",
            error: err.message
        });
    }
};


// 5) DELETE /usuarios/:id
// Elimina un usuario por ID.
// Devolver mensaje de confirmación.
const deleteUsuario = async (request, response) => {
  const usuario = await Usuarios.findByPk(request.params.id);
  if (!usuario) {
    return response
      .status(404)
      .json({ status: 404, message: "usuario no encontrado" });
  }
  await usuario.destroy();
  response.json({
    data: usuario,
    status: 201,
    message: "usuario eliminado de manera exitosa",
  });
}

module.exports = {
  getUsuarios,
  getUsuariosById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};