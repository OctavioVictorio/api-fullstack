const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const usuariosRoutes = require("./routes/usuarios.routes");
const productosRoutes = require("./routes/productos.routes");

app.use(cors());
app.use(express.json());


app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
