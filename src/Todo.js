import "./Todo.css";

function Todos({ todo, onChange, onDelete }) {
    return (
        <div className="todo">
            <div  className="delete-container">
                <svg className="delete-graphic" onClick={() => onDelete()} viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
                    />
                </svg>
            </div>
            <input
                type="checkbox"
                id={todo.description}
                name={todo.description}
                defaultChecked={todo.completed}
                onChange={() => {
                    onChange();
                }}
                className="todo-checkbox"
            />
            <div className="todo-text">{todo.description}</div>
        </div>
    );
}

export default Todos;
