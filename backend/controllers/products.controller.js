const {Producto} = require("../models/");

const getProducts = async (request, response) => {
  try {
    const productos = await Producto.findAll();
    response.json({data: productos, status: 200, message: "productos obtenidos de manera exitosa"});
  } catch (err) {
    response.status(500).json({status: 500, message: "Error al obtener los productos"});
  }
}

const getProductById = async (request, response) => {
  try {
    const producto = await Producto.findByPk(request.params.id);
    if (!producto) {
      return response.json({ status: 404, message: "producto no encontrado" });
    }
    response.json({
      data: producto,
      status: 200,
      message: "producto obtenido de manera exitosa",
    });
  } catch (err) {
    response.status(500).json({status: 500, message: "Error al obtener el producto", error: err.message });
  }
}

const createProduct = async (request, response) => {
  const { nombre, precio } = request.body;
  try {
      if(!nombre || !precio){
        return response.status(400).json({ message: "Faltan datos obligatorios (nombre o precio)."});
      }
      const nuevoProducto = await Producto.create({ nombre, precio });
      response.status(201).json({
        message: "producto creado de manera exitosa",
        data: nuevoProducto,
      });
  } catch (err) {
    response.status(500).json({ message: "Error al crear el producto", error: err.message });
  }
}

const updateProduct = async (request, response) => {
  try {
    const producto = await Producto.findByPk(request.params.id);
    if (!producto) {
      return response.json({ status: 404, message: "producto no encontrado" });
    }
    const { nombre, precio } = request.body;
    producto.nombre = nombre || producto.nombre;
    producto.precio = precio || producto.precio;
    await producto.save();
    response.json({
      data: producto,
      status: 201,
      message: "producto actualizado de manera exitosa",
    });
  } catch (err) {
    response.status(500).json({ message: "Error al actualizar el producto", error: err.message });
  }
}

const deleteProduct = async (request, response) => {
  try {
    const producto = await Producto.findByPk(request.params.id);
    if (!producto) {
      return response.json({ status: 404, message: "producto no encontrado" });
    }
    await producto.destroy();
    response.json({
      data: producto,
      status: 201,
      message: "producto eliminado de manera exitosa",
    });
  } catch (err) {
    response.status(500).json({ message: "Error al eliminar el producto", error: err.message });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};