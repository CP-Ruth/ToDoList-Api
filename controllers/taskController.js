const Task = require("../Models/Task.model");


//Obtener tdas las tareas
const getAllTasks = async (req, res) => {
    try {
        const tareas = await Task.find();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
}

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
    try {
        //buscar la tarea po id
        const tarea = await Task.findById(req.params.id);
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

        res.json(tarea); // Si la encontramos, respondemos con la tarea
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
}

//Crear una tarea
const createTask = async (req, res) => {
    try {
        //creamos una nueva tarea
        const nuevaTarea = new Task({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            estado: req.body.estado,
            fechaLimite: req.body.fechaLimite
        })
        //guardamos la tarea 
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);

    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

//Editar una tarea
const editTask = async (req, res) => {
    try {
        const tareaEditada = await Task.findByIdAndUpdate(
            req.params.id,
            {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                estado: req.body.estado,
                fechaLimite: req.body.fechaLimite
            },
            { new: true } // para devolver la versión actualizada
        );
        if (!tareaEditada) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        };
        res.json(tareaEditada);

    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

//Eliminar una tarea
const deleteTask = async (req, res) => {
    try {
        const tareaEliminada = await Task.findByIdAndDelete(req.params.id);

        if(!tareaEliminada){
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ mensaje: 'Tarea eliminada correctamente' });
        
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

//Exportamos las funciones
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    editTask,
    deleteTask
}