const Sprint = require("../Models/Sprint.model");

//Obtener todos los sprints
const getAllSprints = async (req, res) => {
    try {
        const sprints = await Sprint.find().populate("tareas");
        res.json(sprints);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los sprints' });
    }
}

//Obtener un sprint por ID
const getSprintById = async (req, res) => {
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
}

//Crear un sprint
const createSprint = async (req, res) => {
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
}

//Editar un sprint
const editSprint = async (req, res) => {
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
}

//Eliminar un sprint
const deleteSprint = async (req, res) => {
try {
        const sprintEliminado = await Sprint.findByIdAndDelete(req.params.id);

        if(!sprintEliminado){
            return res.status(404).json({ error: 'Sprint no encontrado' });
        }

        res.json({ mensaje: 'Sprint eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

//Agregar una tarea a un sprint
const addTaskToSprint = async (req, res) => {
    try {
        //Buscamos por id el sprint al que  le vamos a agregar la tarea
        const sprint = await Sprint.findById(req.params.id).populate("tareas");

        if(!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
        
        // Verificamos que no esté repetida la tarea 
        //sprint.tareas son objetos no strings, req.params.taskId es un string, por eso lo convertimos a string para comparar
        if (sprint.tareas.map(id => id.toString()).includes(req.params.taskId)) {
            return res.status(409).json({ message: 'La tarea ya se encuentra en el sprint' });
        } else{
            sprint.tareas.push(req.params.taskId);
        };

        const sprintActualizado = await sprint.save();
        res.json(sprintActualizado);
    
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

//Quitar una tarea de un sprint mandarla al backlog
const removeTaskfromSprint = async (req, res) => {
    try {
        //Buscamos por id el sprint al que  le vamos a quitar la tarea
        const sprint = await Sprint.findById(req.params.id);

        if(!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
        
        const tareaSeleccionada = sprint.tareas.indexOf(req.params.taskId);
        if(tareaSeleccionada === -1) {
            return res.status(404).json({ message: 'La tarea no se encuentra en el sprint' });
        } 

        // Remover la tarea del arreglo de tareas ()
        sprint.tareas = sprint.tareas.filter(id => id.toString() !== req.params.taskId);

        const sprintActualizado = await sprint.save();
        res.json(sprintActualizado);
    
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

//Exportamos las funciones
module.exports = {
    getAllSprints,
    getSprintById,
    createSprint,
    editSprint,
    deleteSprint,
    addTaskToSprint,
    removeTaskfromSprint
}
