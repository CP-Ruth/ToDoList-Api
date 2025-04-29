const Backlog = require("../Models/Backlog.model");
const Tarea = require("../Models/Task.model"); // modelo de la tarea

//Obtener el backlog
const getBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate("tareas");

        if (!backlog) {
            return res.status(404).json({ message: 'Backlog no encontrado' });
        };

        res.json(backlog);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Crear backlog
const createBacklog = async (req, res) => {
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
}

//Agregar una tarea al backlog
const addTaskToBacklog = async (req, res) => {
    try {
        //verifico si hay un backlog
        const backlog = await Backlog.findOne().populate("tareas");

        if (!backlog) {return res.status(404).json({ error: 'Backlog no encontrado' });    } //si no existe cierra el try y retorna el err

        //Si existe, busco por id la tarea a agregar
        const tarea = await Tarea.findById(req.params.taskId);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' }); //si no existe cierra el try y retorna el err
        }

        //corroboro que no se vaya a duplicar duplicado
        if (backlog.tareas.includes(tarea.id)) {
            return res.status(409).json({ message: 'La tarea ya está en el backlog' });
        }

        //Agrego la tarea al array de tareas
        backlog.tareas.push(tarea);
        await backlog.save() //
        res.json({ message: 'Tarea agregada al backlog', backlog });

    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea el backlog' });
    }
}

const removeTaskFromBacklog = async (req, res) => {
    try {
        //verifico si hay un backlog
        const backlog = await Backlog.findOne().populate("tareas");
        if (!backlog) {
            return res.status(404).json({ error: 'Backlog no encontrado' }); //si no existe cierra el try y retorna el err
        }

        //Si existe, busco por id la tarea a remover
        const tarea = await Tarea.findById(req.params.taskId);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' }); //si no existe cierra el try y retorna el err
        }

        //remuevo la tarea del array de tareas
        backlog.tareas.pull(tarea);
        
        const backlogActualizado = await backlog.save() //
        res.json(backlogActualizado); //devuelvo el backlog actualizado

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea del backlog' });
    }
}
//exporto las funciones
module.exports = {
    getBacklog,
    createBacklog,
    addTaskToBacklog,
    removeTaskFromBacklog
}