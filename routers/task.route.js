const express = require('express');

const {
    getAllTasks,
    getTaskById,
    createTask,
    editTask,
    deleteTask
} = require('../controllers/taskController');


const tareasRouter = express.Router();

// Get- para obtener todas las tareas
tareasRouter.get('/', getAllTasks);

// GET /tasks/:id: Obtener una tarea por ID
tareasRouter.get('/:id', getTaskById);

//●	POST /tasks: Crear una tarea
tareasRouter.post('/', createTask);

//●	PUT /tasks/:id: Editar una tarea
tareasRouter.put('/:id', editTask);

//●	DELETE /tasks/:id: Eliminar una tarea
tareasRouter.delete('/:id', deleteTask);

module.exports = tareasRouter;