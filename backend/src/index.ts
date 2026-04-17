import test = require("node:test");

require("dotenv").config();

const express = require("express");

const cors = require("cors");

//importamos prisma client

const {PrismaClient}= require("@prisma/client");
const {PrismaPg} = require("@prisma/adapter-pg");

//creamos adaptadorusandolaURL de conexion
//es la conexion real a postgresql
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

//Creamos la instacia de prisma
const prisma = new PrismaClient({adapter});

const app = express();
const PORT = process.env.PORT || 3000;
//para despliegue const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

/*let tasks = [
  { id: 1, text: "Study Express", completed: false },
  { id: 2, text: "Build backend", completed: true },
];*/

app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});

/*app.get("/tasks", (req: any, res: any) => {
  res.json(tasks);
});*/

//GET / TASK
app.get("/tasks", async (req: any, res: any) => {
  try{
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  }catch(error){
    console.error("Error en GET/tasks:", error);
    res.status(500).json({message: "Error al obtener tareas"});
  }
});

/*app.post("/tasks", (req: any, res: any) => {
  console.log("POST / tasksfue llamado");
  console.log("Datos recibidos:");
  const newTask = {
    id: req.body.id,
    text: req.body.text,
    completed: req.body.completed,
  };
  tasks.push(newTask);
   console.log("Lista actualizada:", tasks);
  res.json(newTask);
});*/

//POST TASK
app.post("/tasks", async (req: any, res: any) => {
  try{
    const newTask = await prisma.task.create({
      data:{
        text: req.body.text,
        completed:false
      },
    });

    res.json(newTask);
  }catch(error){
    console.error("Error en POST/tasks:", error);
    res.status(500).json({message: "Error al crear tarea"});
  }
});


/*app.delete('/tasks/:id', (req: any, res: any) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Task deleted successfully' });
});*/

//DELETE TASK
app.delete("/tasks/:id", async (req: any, res: any) => {
  try{
    const taskId = Number(req.params.id);
    await prisma.task.delete({
      where:{id: taskId},
    });

    res.json({message: "Deleted"});
  }catch(error){
    console.error("Error en DELETE/tasks/:id:", error);
    res.status(500).json({message: "Error al eliminar tarea"});
  }
});

// Ruta para actualizar una tarea
/*app.put('/tasks/:id', (req:any, res:any) => {
  const { id } = req.params;
  const updatedTask = req.body;

  // Buscar tarea por ID
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Actualizar la tarea (puede ser solo el campo completed o todo el objeto)
  tasks[index] = { ...tasks[index], ...updatedTask };

  res.json(tasks[index]);
});*/

//PUT TASK
app.put("/tasks/:id", async (req: any, res: any) => {
  try{
    const taskId = Number(req.params.id);
    
    const updatedTask = await prisma.task.update({
      where:{id:taskId},
      data:{
        completed:req.body.completed,
      },
    });

    res.json(updatedTask);
  }catch(error){
    console.error("Error en PUT/tasks/:id:", error);
    res.status(500).json({message: "Error al crear tarea"});
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
