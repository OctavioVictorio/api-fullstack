const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../db/productos.json");

const leerProductos = () => {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
};

let productos = leerProductos();

const escribirProductos = (productos) => {
    try{
      fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
    }catch(error){
      console.error("Error al escribir los productos:", error);
    }   
}

const getProducts = (request, response) => {
  response.json(productos);
};

const getProductById = (request, response) => {
  const producto = productos.find(
    (item) => item.id === parseInt(request.params.id)
  );
  if (!producto) {
    return response.json({ status: 404, message: "producto no encontrado" });
  }
  response.json({
    data: producto,
    status: 200,
    message: "producto obtenido de manera exitosa",
  });
};

const createProduct = (request, response) => {
  const { nombre, precio } = request.body;
  const nuevoProducto = { id: productos.length + 1, nombre, precio };
  productos.push(nuevoProducto);
  escribirProductos(productos);
  response.json({
    status: 201,
    data: nuevoProducto,
    message: "producto creado de manera exitosa",
  });
};

const updateProduct = (request, response) => {
  const producto = productos.find(
    (item) => item.id === parseInt(request.params.id)
  );
  if (!producto) {
    return response.json({ status: 404, message: "producto no encontrado" });
  }
  const { nombre, precio } = request.body;
  producto.nombre = nombre || producto.nombre;
  producto.precio = precio || producto.precio;

  escribirProductos(productos);
  
  response.json({
    data: producto,
    status: 201,
    message: "producto actualizado de manera exitosa",
  });
};

const deleteProduct = (request, response) => {
  let producto = productos.find(
    (item) => item.id === parseInt(request.params.id)
  );
  if (!producto) {
    return response.json({ status: 404, message: "producto no encontrado" });
  }
  productos = productos.filter((item) => item.id !== producto.id);

  escribirProductos(productos);
  
  response.json({
    data: producto,
    status: 201,
    message: "producto eliminado de manera exitosa",
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};