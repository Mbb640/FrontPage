import "./Todo.css";

function Todos({ todo }) {
    console.log(todo.completed)
    return (
        <div className="todo">
            <label htmlFor={todo.description}>
                <input
                    type="checkbox"
                    id={todo.description}
                    name={todo.description}
                    defaultChecked={todo.completed}
                />
                {todo.description}
            </label>
        </div>
    );
}

export default Todos;
