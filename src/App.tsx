import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskButton from "./components/TaskButton";
import { Plus } from "lucide-react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [texto, setTexto] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]); 
  const API = import.meta.env.VITE_API_URL;

  useEffect(()=> {
    fetch(`${API}/tasks`)
    .then((response) => response.json())
    .then((data) => {
      // Validar que sea array
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("La API no devolvió un array:", data);
        setTasks([]);
      }
    })
    .catch((error)=> {
      console.log("Error al obtener tasks:", error);
    });
  },[]);

  const addTask = (taskText: string) =>{
    if (!taskText.trim()) {
      alert("La tarea no puede estar vacía");
      return; // ⛔ corta la ejecución
    };
    
    const newTask ={
      id: Date.now(),
      text: taskText,
      completed: false
    };

    fetch(`${API}/tasks`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(newTask),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Tarea creada en backend:", data);
      setTasks([...tasks, data]);
      setTexto(""); // limpiar input después de agregar
    })
    .catch((error)=>{
      console.log("Error al crear tarea:", error);
    });
  };

  const toggleCompletar = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(tasks.map((t) => (t.id === id ? data : t)));
      })
      .catch((error) => {
        console.log("Error al actualizar tarea:", error);
      });
  };

  const deleteTask = (taskId: number) => {
    fetch(`${API}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar tarea");
      }
      console.log("Tarea eliminada en backend:", taskId);

      // Actualizar estado eliminando la tarea del array
      setTasks(tasks.filter((task) => task.id !== taskId));
    })
    .catch((error) => {
      console.log("Error al eliminar tarea:", error);
    });
  };

  const completadas = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <Header />

        <TaskInput texto={texto} setTexto={setTexto} />

        <TaskButton
          label="Agregar"
          icon={<Plus size={18} />}
          onClick={() => addTask(texto)}
        />
     
        <TaskList
          tasks={tasks}
          onEliminar={deleteTask}
          onToggle={toggleCompletar}
        />

        <p>
          Tareas Completadas: {completadas} 
          Tareas Pendientes: {tasks.length - completadas} 
          Total tareas: {tasks.length}
        </p>
      </div>
    </div>
  );
}

export default App;