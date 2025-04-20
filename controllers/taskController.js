const Task = require('../Models/Task.model');

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
}

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
    try {
        const tasks = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
}

// Crear una tarea
exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la tarea' });
    }
};

// Editar una tarea
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la tarea' });
    }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};