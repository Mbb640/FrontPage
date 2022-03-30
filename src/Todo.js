import "./Todo.css";

function Todos({ todo }) {
    return (
        <div className="todo">
            <label className="label" htmlFor={todo.description}>
                <input
                    type="checkbox"
                    id={todo.description}
                    name={todo.description}
                    defaultChecked={todo.completed}
                />
                <div>{todo.description}</div>
            </label>
        </div>
    );
}

export default Todos;
