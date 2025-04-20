//Importaciones
const express = require('express');
const Sprint = require('../Models/Sprint.model');
const sprintRouter = express.Router();

//●	GET /sprints: Obtener todos los sprints
sprintRouter.get('/', async (req, res) => {
    try {
        const sprints = await Sprint.find().populate("tareas");
        res.json(sprints);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los sprints' });
    }
});

//●	GET /sprints/:id: Obtener un sprint por ID
sprintRouter.get('/:id', async (req, res) => {
    try {
        //buscar el sprint por id
        const sprint = await Sprint.findById(req.params.id).populate("tareas")
        if (!sprint) {
            return res.status(404).json({ error: 'Sprint no encontrado' });
        }

        res.json(sprint);// Si la encontramos, respondemos con la tarea
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el sprint' });
    }
});

//●	POST /sprints: Crear un sprint
sprintRouter.post('/', async (req, res) => {
    try {
        //creamos un nuevo sprint
        const nuevoSprint = new Sprint({
            nombre: req.body.nombre,
            fechaInicio: req.body.fechaInicio,
            fechaCierre: req.body.fechaCierre
        });

        //guardamos el sprint 
        const sprintGuardado = await nuevoSprint.save();
        res.status(201).json(sprintGuardado);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//●	PUT /sprints/:id: Editar un sprint
sprintRouter.put('/:id', async (req,res) => {
    try {
        const sprintEditado = await Sprint.findByIdAndUpdate(
            req.params.id,
            {
                nombre: req.body.nombre,
            fechaInicio: req.body.fechaInicio,
            fechaCierre: req.body.fechaCierre
            },
            { new: true}
        );
        if(!sprintEditado){
            return res.status(404).json({ error: 'Sprint no encontrada' });
        };
        res.json(sprintEditado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//●	DELETE /sprints/:id: Eliminar un sprint
sprintRouter.delete('/:id', async (req, res) => {
    try {
        const sprintEliminado = await Sprint.findByIdAndDelete(req.params.id);

        if(!sprintEliminado){
            return res.status(404).json({ error: 'Sprint no encontrado' });
        }

        res.json({ mensaje: 'Sprint eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

//●	PUT /sprints/:id/add-task/:taskId: Agregar una tarea a un sprint
sprintRouter.put('/:id/add-task/:taskId', async (req,res) => {
    try {
        //Buscamos por id el sprint al que  le vamos a agregar la tarea
        const sprint = await Sprint.findById(req.params.id);

        if(!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
        
        // Verificamos que no esté repetida la tarea (es decir que la tarea existe)
        if(sprint.tareas.includes(req.params.taskId)) {
            return res.status(404).json({ message: 'La tarea ya se encuentra en el sprint' });
        } else{
            sprint.tareas.push(req.params.taskId);
        };

        const sprintActualizado = await sprint.save();
        res.json(sprintActualizado);
    
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
})

module.exports = sprintRouter;