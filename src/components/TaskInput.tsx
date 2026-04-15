type Props = {
  texto: string;
  setTexto: (t: string) => void;
};

function TaskInput({ texto, setTexto }: Props) {
  return (
    <input
      type="text"
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      placeholder="Escribe una tarea..."
    />
  );
}

export default TaskInput;