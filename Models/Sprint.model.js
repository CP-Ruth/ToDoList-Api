const mongoose = require("mongoose");
const Task = require("./Task.model");

// Defino el esquema de un usuario
const SprintSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true 
    },
    fechaInicio: {
        type: String,
        required: true 
    },
    fechaCierre: {
        type: String,
        required: true 
    },
    tareas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Task",
        default: []
    }]
})

module.exports = mongoose.model("Sprint", SprintSchema);