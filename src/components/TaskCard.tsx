import TaskButton from "./TaskButton";
import { X } from "lucide-react";

type TaskCardProps = {
  text: string;
  completed: boolean;
  onEliminar: () => void;
  onToggle: () => void;
};

function TaskCard({ text, completed, onEliminar, onToggle }: TaskCardProps) {
  return (
    <li className="taskCard">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="checkbox" checked={completed} onChange={onToggle}/>

        <span
          style={{
            textDecoration: completed ? "line-through" : "none",
            opacity: completed ? 0.6 : 1,
          }}
        >
          {text}
        </span>
      </div>

      <TaskButton
        label="Eliminar"
        icon={<X size={18} />}
        variant="danger"
        onClick={(e) => {
          e.stopPropagation();
          onEliminar();
        }}
      />
    </li>
  );
}

export default TaskCard;