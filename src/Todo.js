import "./Todo.css";

function Todos({ todo, onChange, onDelete }) {
    return (
        <div className="todo">
            <div onClick={() => onDelete()}>X</div>
            <input
                type="checkbox"
                id={todo.description}
                name={todo.description}
                defaultChecked={todo.completed}
                onChange={() => {
                    onChange();
                }}
                className="todoCheckbox"
            />
            <div>{todo.description}</div>
        </div>
    );
}

export default Todos;
