const Backlog = require('../Models/Backlog.model'); // modelo, no esquema
const Tarea = require('../Models/Task.model'); // modelo de la tarea

const {
    getBacklog,
    createBacklog,
    addTaskToBacklog,
    removeTaskFromBacklog
} = require('../controllers/backlogController');

const express = require('express');
const backlogRouter = express.Router();

//●	GET /backlog: Obtener el backlog
backlogRouter.get('/', getBacklog);

//●	POST /backlog: Crear backlog (solo uno en este caso)
backlogRouter.post('/', createBacklog);

//●	PUT /backlog/add-task/:taskId: Agregar una tarea al backlog
backlogRouter.put('/add-task/:taskId', addTaskToBacklog);

//●	PUT /backlog/remove-task/:taskId: Remover una tarea del backlog
backlogRouter.put('/remove-task/:taskId', removeTaskFromBacklog);

module.exports = backlogRouter;