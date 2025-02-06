require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Servir archivos estáticos

// Conexión a MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch(err => console.error("❌ Error al conectar:", err));

// Modelo de datos
const RegistroSchema = new mongoose.Schema({
    nombre: String,
    grupo: String,
    grado: String,
    carrera: String
});
const Registro = mongoose.model("Registro", RegistroSchema);
console.log(Registro);
// Ruta para cargar index.html en la raíz "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para recibir datos del formulario
app.post("/registro", async (req, res) => {
    try {
        const nuevoRegistro = new Registro(req.body);
        await nuevoRegistro.save();
        res.status(201).json({ mensaje: "Registro exitoso 🎉" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar", error });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
