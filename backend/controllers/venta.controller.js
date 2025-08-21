const { Venta, Producto, Usuarios } = require("../models");

const getAllSells = async (request, response) => {
  try {
    const Sale = await Venta.findAll({
        attributes: [ "id", "cantidad", "total", "fecha" ],
        include: [
                {
                    model: Usuarios,
                    attributes: ['nombre', 'email']
                },
                {
                    model: Producto,
                    attributes: ['nombre', 'precio']
                }
        ],
    });
    response.json({
      data: Sale,
      status: 200,
      message: "Ventas obtenidas de manera exitosa",
    });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Error al obtener las ventas", error: err.message });
  }
};

const getSaleById = async (request, response) => {
  try {
    const Sale = await Venta.findByPk(request.params.id, {
      include: [Usuarios, Producto],
    });
    if (!Sale) {
      return response.json({ status: 404, message: "Venta no encontrada" });
    }
    response.json({
      data: Sale,
      status: 200,
      message: "venta obtenida de manera exitosa",
    });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Error al obtener la venta", error: err.message });
  }
};

const createSale = async (request, response) => {
  const { usuarioId, productoId, cantidad, total, fecha } = request.body;
  try {
    if (!usuarioId || !productoId || !cantidad || !total || !fecha) {
      return response
        .status(400)
        .json({
          message:
            "Faltan datos obligatorios (id_usuario, id_producto o cantidad).",
        });
    }
    const newSale = await Venta.create({
      usuarioId,
      productoId,
      cantidad,
      total,
      fecha,
    });
    response.status(201).json({
      message: "venta creada de manera exitosa",
      data: newSale,
    });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Error al crear la venta", error: err.message });
  }
};

const updateSale = async (request, response) => {
  try {
    const Sale = await Venta.findByPk(request.params.id);
    if (!Sale) {
      return response.json({ status: 404, message: "Venta no encontrada" });
    }
    const { usuarioId, productoId, cantidad, total, fecha } = request.body;
    Sale.usuarioId = usuarioId || Sale.usuarioId;
    Sale.productoId = productoId || Sale.productoId;
    Sale.cantidad = cantidad || Sale.cantidad;
    Sale.total = total || Sale.total;
    Sale.fecha = fecha || Sale.fecha;

    await Sale.save();

    response.json({
      data: Sale,
      status: 201,
      message: "Venta actualizada de manera exitosa",
    });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Error al actualizar la venta", error: err.message });
  }
};

deleteSale = async (request, response) => {
  try {
    const Sale = await Venta.findByPk(request.params.id);
    if (!Sale) {
      return response.json({ status: 404, message: "Venta no encontrada" });
    }
    await Sale.destroy();
    response.json({
      data: Sale,
      status: 201,
      message: "Venta eliminada de manera exitosa",
    });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Error al eliminar la venta", error: err.message });
  }
}
module.exports = {
  getAllSells,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
