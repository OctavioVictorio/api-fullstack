const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../db/usuarios.json");

const leerUsuarios = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

let usuarios = leerUsuarios();

const escribirUsuarios = () => {
  try{
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
  }catch(error){
    console.error("Error al escribir los usuarios:", error);
  }
}

// Función para validar formato de email
function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 1) GET /usuarios
// Devuelve el listado completo de usuarios.
const getUsuarios = (request, response) => {
  response.json(usuarios);
}

// 2) GET /usuarios/:id
// Devuelve un usuario por su ID.
// Si no se encuentra, devolver un error 404.
const getUsuariosById = (request, response) => {
    const usuario = usuarios.find(
      (item) => item.id === parseInt(request.params.id)
    );
    if (!usuario) {
      return response.json({ status: 404, message: "usuario no encontrado" });
    }
    response.json({
      data: usuario,
      status: 200,
      message: "usuario obtenido de manera exitosa",
    });
}

// 3) POST /usuarios
// Recibe un nuevo usuario por req.body.
// El usuario debe tener al menos:
//  nombre, email, edad.
// Asignar un id único automáticamente.
// Devolver el usuario creado.
const createUsuario = (request, response) => {
    const { nombre, email, edad } = request.body;
    // Validaciones
    if (!nombre || !email || edad === undefined) {
      return response.status(400).json({
        status: 400,
        message: "Faltan datos obligatorios (nombre, email o edad).",
      });
    }
    if (!emailValido(email)) {
      return response.status(400).json({
        status: 400,
        message: "El email no tiene un formato válido.",
      });
    }

    if (typeof edad !== "number" || edad < 0) {
      return response.status(400).json({
        status: 400,
        message: "La edad debe ser un número válido mayor que 0.",
      });
    }

    const emailExistente = usuarios.find((u) => u.email === email);
    if (emailExistente) {
      return response.status(400).json({
        status: 400,
        message: "El email ya está en uso.",
      });
    }

    const nuevoUsuario = { id: usuarios.length + 1, nombre, email, edad };
    usuarios.push(nuevoUsuario);

    escribirUsuarios(usuarios);

    response.status(201).json({
      data: nuevoUsuario,
      status: 201,
      message: "usuario creado de manera exitosa",
    });
}

// 4) PUT /usuarios/:id
// Actualiza los datos de un usuario existente.
// Validar que el usuario exista antes de modificarlo.
// Devolver el usuario actualizado.
const updateUsuario = (request, response) => {
    const usuario = usuarios.find(
      (item) => item.id === parseInt(request.params.id)
    );
    if (!usuario) {
      return response
        .status(404)
        .json({ status: 404, message: "usuario no encontrado" });
    }

    const { nombre, email, edad } = request.body;

    // Validaciones
    if (
      email &&
      usuarios.some((u) => u.email === email && u.id !== usuario.id)
    ) {
      return response.status(400).json({
        status: 400,
        message: "El email ya está en uso por otro usuario.",
      });
    }

    if (email && !emailValido(email)) {
      return response.status(400).json({
        status: 400,
        message: "El email no tiene un formato válido.",
      });
    }

    if (edad !== undefined && (typeof edad !== "number" || edad < 0)) {
      return response.status(400).json({
        status: 400,
        message: "La edad debe ser un número válido mayor que 0.",
      });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.edad = edad || usuario.edad;

    escribirUsuarios(usuarios);

    response.json({
      data: usuario,
      status: 200,
      message: "usuario actualizado de manera exitosa",
    });
}

// 5) DELETE /usuarios/:id
// Elimina un usuario por ID.
// Devolver mensaje de confirmación.
const deleteUsuario = (request, response) => {
   let usuario = usuarios.find(
     (item) => item.id === parseInt(request.params.id)
   );
   if (!usuario) {
     return response.status(404).json({
       status: 404,
       message: "usuario no encontrado",
     });
   }

   usuarios.splice(usuarios.indexOf(usuario), 1);

   escribirUsuarios(usuarios);
   
   response.json({
     data: usuario,
     status: 200,
     message: "usuario eliminado de manera exitosa",
   }); 
}

module.exports = {
  getUsuarios,
  getUsuariosById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};