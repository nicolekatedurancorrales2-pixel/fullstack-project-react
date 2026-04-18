import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskButton from "./components/TaskButton";
import { Plus } from "lucide-react";


type Tarea = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  
  const [texto, setTexto] = useState("");
  /*const [tasks, setTasks] = useState<Tarea[]>([]);*/

  const [tasks, setTasks] = useState<Tarea[]>([]); 

useEffect(()=> {
  fetch("http://localhost:3000/tasks")
  .then((response) => response.json())
  .then((data) => {
    //setTasks(data);
    // Validar que sea array
    console.log("DATA QUE VIENE DEL BACKEND:", data);
    console.log("TIPO:", typeof data);
    console.log("ES ARRAY:", Array.isArray(data));
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

// const agregarTarea = () => {
//   if (texto.trim() === "") {
//     alert("No puedes agregar una tarea vacía");
//     return;
//   }

//   setTasks([
//     ...tasks,
//     { id: Date.now(), text: texto, completed: false },
//   ]);

//   setTexto("");
// };

  const addTask = (taskText: string) =>{
    const newTask ={
      id: Date.now(),
      text: taskText,
      completed: false
    };

    fetch("http://localhost:3000/tasks",{
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
      setTexto(""); // limpiar input después de agregarsi
    })
    .catch((error)=>{
      console.log("Error al crear tarea:", error);
    });
  };

  // const eliminarTarea = (id: number) => {
  //   setTasks(tasks.filter((t) => t.id !== id));
  // };
  
  const deleteTask = (taskId: number) => {
  fetch(`http://localhost:3000/tasks/${taskId}`, {
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

  // const toggleCompletar = (id: number) => {
  //   setTasks(
  //     tasks.map((t) =>
  //       t.id === id ? { ...t, completed: !t.completed } : t
  //     )
  //   );
  // };

    const toggleCompletar = (id: number) => {
    const tarea = tasks.find((t) => t.id === id);
    if (!tarea) return;

    const updatedTask = { ...tarea, completed: !tarea.completed };

    fetch(`http://localhost:3000/tasks/${id}`, {
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

        <p>
          Completadas: {completadas} / {tasks.length}
        </p>

        <TaskList
          tareas={tasks}
          onEliminar={deleteTask}
          onToggle={toggleCompletar}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;