const express = require("express");

const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
let tasks = [
  { id: 1, text: "Study Express", completed: false },
  { id: 2, text: "Build backend", completed: true },
];
app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});
app.get("/tasks", (req: any, res: any) => {
  res.json(tasks);
});

app.post("/tasks", (req: any, res: any) => {
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
});

app.delete('/tasks/:id', (req: any, res: any) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Task deleted successfully' });
});

// Ruta para actualizar una tarea
app.put('/tasks/:id', (req:any, res:any) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
