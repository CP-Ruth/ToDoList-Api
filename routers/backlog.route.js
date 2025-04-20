const Backlog = require('../Models/Backlog.model'); // modelo, no esquema
const Tarea = require('../Models/Task.model'); // modelo de la tarea

const express = require('express');
const backlogRouter = express.Router();

//●	GET /backlog: Obtener el backlog
backlogRouter.get('/', async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate("tareas");

        if (!backlog) {
            return res.status(404).json({ message: 'Backlog no encontrado' });
        };

        res.json(backlog);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//●	POST /backlog: Crear backlog (solo uno en este caso)
backlogRouter.post('/', async (req, res) => {

    try {
        //verifico si hay un backlog
        const existeBacklog = await Backlog.findOne();
        if (existeBacklog) {
            return res.status(400).json({ message: 'Ya existe un backlog' });
        }

        //creo un backlog si no existe
        const nuevoBacklog = new Backlog();
        const guardado = await nuevoBacklog.save();
        res.status(201).json(guardado);

    } catch (error) {
        res.status(500).json({ error: 'Error al crear el backlog' });
    }
});

//●	PUT /backlog/add-task/:taskId: Agregar una tarea al backlog
backlogRouter.put('/add-task/:taskId',async (req,res) => {
    try {
        //verifico si hay un backlog
        const backlog = await Backlog.findOne().populate("tareas");
        if (!backlog) {
            return res.status(404).json({ error: 'Backlog no encontrado' }); //si no existe cierra el try y retorna el err
        }
        
        //Si existe, busco por id la tarea a agregar
        const tarea = await Tarea.findById(req.params.taskId);
        if(!tarea){
            return res.status(404).json({ error: 'Tarea no encontrada' }); //si no existe cierra el try y retorna el err
        }

        //corroboro que no esté duplicado
        if(backlog.tareas.includes(tarea.id)){
            return res.status(400).json({ message: 'La tarea ya está en el backlog' });
        }

        //Agrego la tarea al array de tareas
        backlog.tareas.push(tarea);
        await backlog.save() //
        res.json({ message: 'Tarea agregada al backlog', backlog });

    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea el backlog' });
    }
})


module.exports = backlogRouter;