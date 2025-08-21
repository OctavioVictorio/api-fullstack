const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const usuariosRouter = require("./routes/usuarios.routes");
const productosRouter = require("./routes/productos.routes");
const ventaRouter = require("./routes/venta.routes");
const authRouter = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());


app.use("/usuarios", usuariosRouter);
app.use("/productos", productosRouter);
app.use("/ventas", ventaRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
