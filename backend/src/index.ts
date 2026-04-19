import test = require("node:test");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');

//importamos prisma client
const {PrismaClient}= require("@prisma/client");
const {PrismaPg} = require("@prisma/adapter-pg");
const SECRET_KEY = "12345";


//creamos adaptador usando la URL de conexion
//es la conexion real a postgresql
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

//Creamos la instacia de prisma
const prisma = new PrismaClient({adapter});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});

//GET TASK
app.get("/tasks", async (req: any, res: any) => {
  try{
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  }catch(error){
    console.error("Error en GET/tasks:", error);
   if (error instanceof Error) {
    res.status(500).json({
      message: "Error al obtener tareas",
      error: error.message,
    });
  } else {
    res.status(500).json({
      message: "Error al obtener tareas",
      error: "Error desconocido",
    });
  }
  }
});

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
    res.status(500).json({message: "Error al actualizar tarea"});
  }
});

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

//POST LOGIN
app.post("/login", (req: any, res: any) => {
  const { email, password } = req.body;

  // Credenciales de prueba
  if (email === "admin" && password === "12345") {
    const token = jwt.sign(
      { user: email },
      "secret_key",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ error: "Credenciales inválidas" });
});

//MIDDLEWARE VERIFY TOKEN
const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded;
    console.log('req.user',req.user)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

//RUTA PROTEGIDA
app.get("/private", verifyToken, (req: any, res: any) => {
 res.json({ message: "Acceso permitido" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});