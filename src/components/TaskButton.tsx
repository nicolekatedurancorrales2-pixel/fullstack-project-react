import { ReactNode, MouseEvent } from "react";

type ButtonProps = {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
  variant?: "primary" | "danger" | "ghost";
};

function TaskButton({ label, onClick, icon, variant = "primary" }: ButtonProps) {
  return (
    <button className={`btn ${variant}`} onClick={onClick}>
      {icon && <span className="icon">{icon}</span>}
      {label}
    </button>
  );
}

export default TaskButton;