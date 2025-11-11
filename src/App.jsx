import { useEffect, useState } from "react";
import "./index.css";

const DEFAULT_ITEMS = [];
const STORAGE_KEY = "todo-items";

export function App() {
  const [item, setItem] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_ITEMS;

    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : DEFAULT_ITEMS;
    } catch (error) {
      console.error("Failed to parse items from localStorage", error);
      return DEFAULT_ITEMS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
  }, [item]);

  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleToggeItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <div className="todo-wrapper">
      <h1>To-Do List</h1>
      <Form onAddItems={handleAddItems} />
      <Itemlist
        item={item}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggeItem}
      />
    </div>
  );
}

function Form({ onAddItems }) {
  const [active, setActive] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!active) return;

    const newItem = { active, completed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setActive("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Новая задача"
        value={active}
        onChange={(e) => setActive(e.target.value)}
      />
      <button className="todo-add-btn">+</button>
    </form>
  );
}

function Itemlist({ item, onDeleteItem, onToggleItem }) {
  return (
    <>
      <ul className="todo-list">
        {item.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
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
