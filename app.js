const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const backlogRoutes = require('./routers/backlog.route');
const tareasRoutes = require('./routers/task.route');
const sprintRoutes = require('./routers/sprint.route');
require('dotenv').config();

app.use(cors()); // permite todas las conexiones, también puedes configurarlo
app.use(express.json());// Para manejar solicitudes JSON
//Rutas
app.use('/backlog', backlogRoutes);
app.use('/tasks', tareasRoutes);
app.use('/sprints', sprintRoutes)

//conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error de conexión:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});


