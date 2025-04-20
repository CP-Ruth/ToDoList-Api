const mongoose = require("mongoose");

// Defino el esquema de Task
const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        enum: ["pendiente", "en_progreso", "completada"],
        default: "pendiente"
    },
    fechaLimite: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Task", TaskSchema);
