import TaskCard from "./TaskCard";

type Tarea = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  tareas: Tarea[];
  onEliminar: (id: number) => void;
  onToggle: (id: number) => void;
};

function TaskList({ tareas, onEliminar, onToggle }: Props) {
  return (
    <ul>
      {tareas.map((t) => (
        <TaskCard
          key={t.id}
          text={t.text}
          completed={t.completed}
          onEliminar={() => onEliminar(t.id)}
          onToggle={() => onToggle(t.id)}
        />
      ))}
    </ul>
  );
}

export default TaskList;