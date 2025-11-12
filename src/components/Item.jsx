export function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className="todo-item">
      <label className="todo-check">
        <input type="checkbox" onChange={() => onToggleItem(item.id)}></input>
        <span
          className="todo-text"
          style={item.completed ? { textDecoration: "line-through" } : {}}
        >
          {item.active}
        </span>
      </label>
      <button className="todo-delete" onClick={() => onDeleteItem(item.id)}>
        Х
      </button>
    </li>
  );
}
