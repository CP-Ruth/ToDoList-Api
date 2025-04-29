//Importaciones
const express = require('express');
const sprintRouter = express.Router();

const {
    getAllSprints,
    getSprintById,
    createSprint,
    editSprint,
    deleteSprint,
    addTaskToSprint,
    removeTaskfromSprint
} = require('../controllers/sprintController');

//middleware para verificar  

//●	GET /sprints: Obtener todos los sprints
sprintRouter.get('/', getAllSprints);

//●	GET /sprints/:id: Obtener un sprint por ID
sprintRouter.get('/:id', getSprintById);

//●	POST /sprints: Crear un sprint
sprintRouter.post('/', createSprint);

//●	PUT /sprints/:id: Editar un sprint
sprintRouter.put('/:id', editSprint);

//●	DELETE /sprints/:id: Eliminar un sprint
sprintRouter.delete('/:id',deleteSprint);

//●	PUT /sprints/:id/add-task/:taskId: Agregar una tarea a un sprint
sprintRouter.put('/:id/add-task/:taskId', addTaskToSprint);

//●	PUT /sprints/:id/remove-task/:taskId: remover la tarea del sprint y mandarlo al backlog
sprintRouter.put('/:id/remove-task/:taskId', removeTaskfromSprint);


module.exports = sprintRouter;