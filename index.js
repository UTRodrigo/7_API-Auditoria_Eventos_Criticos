//dependencias
const express = require('express');
require("dotenv").config();

//funciones
const connectDB = require("./src/config/database");
const auditoriaMiddleware = require("./src/middlewares/auditoriaMiddleware");

//variables
const app = express();
const port = process.env.PORT || 5100;

//rutas
const userRoutes = require("./src/routes/usuarioRoutes");
const auditoriaRoutes = require("./src/routes/auditoriaRoutes");

//index.js
app.use(express.json());
connectDB();
app.use(auditoriaMiddleware);
app.use("/users", userRoutes);
app.use("/auditoria", auditoriaRoutes);

app.listen(port, () =>
{
    console.log(`Hello world 2. I'm listening in port ${port}`);
});