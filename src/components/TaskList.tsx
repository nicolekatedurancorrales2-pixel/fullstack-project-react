import TaskCard from "./TaskCard";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  tasks: Task[];
  onEliminar: (id: number) => void;
  onToggle: (id: number) => void;
};

function TaskList({ tasks, onEliminar, onToggle }: Props) {
  return (
    <ul>
      {tasks.map((t) => (
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