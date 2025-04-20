const express = require('express');
const Task = require('../Models/Task.model');

const tareasRouter = express.Router();

// Get- para obtener todas las tareas
tareasRouter.get('/', async (req, res) => {
    try {
        const tareas = await Task.find();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

// GET /tasks/:id: Obtener una tarea por ID
tareasRouter.get('/:id', async (req, res) => {
    try {
        //buscar la tarea po id
        const tarea = await Task.findById(req.params.id);
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

        res.json(tarea); // Si la encontramos, respondemos con la tarea
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
});

//●	POST /tasks: Crear una tarea
tareasRouter.post('/', async (req, res) => {
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
        res.status(400).json({ messaje: error.messaje });
    };
});

//●	PUT /tasks/:id: Editar una tarea
tareasRouter.put('/:id', async (req, res) => {
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
});

//●	DELETE /tasks/:id: Eliminar una tarea
tareasRouter.delete('/:id', async (req,res) => {
    try {
        const tareaEliminada = await Task.findByIdAndDelete(req.params.id);

        if(!tareaEliminada){
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ mensaje: 'Tarea eliminada correctamente' });
        
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
})

module.exports = tareasRouter;