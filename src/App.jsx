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

  function handleDeleteAllItem() {
    setItem([]);
  }

  return (
    <div className="todo-wrapper">
      <h1>To-Do List</h1>
      <Form onAddItems={handleAddItems} />
      <Itemlist
        item={item}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggeItem}
        onDeleteAllItem={handleDeleteAllItem}
      />
      <Stats item={item} />
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

function Itemlist({ item, onDeleteItem, onToggleItem, onDeleteAllItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = item;

  if (sortBy === "active")
    sortedItems = item.slice().sort((a, b) => a.active.localeCompare(b.active));

  if (sortBy === "completed")
    sortedItems = item
      .slice()
      .sort((a, b) => Number(a.completed) - Number(b.completed));

  if (sortedItems.length === 0) return <></>;
  if (sortedItems.length > 0)
    return (
      <>
        <ul className="todo-list">
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
        <div className="todo-controls">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="todo-select"
          >
            <option value="input">Сортировка по добавлению</option>
            <option value="active">Сортировка по алфавиту</option>
            <option value="completed">Сотировка по выполнению</option>
          </select>
          <button className="todo-reset" onClick={onDeleteAllItem}>
            Очистить поле
          </button>
        </div>
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

function Stats({ item }) {
  if (!item.length)
    return (
      <p className="footer">
        <em>Начни добавлять задачи</em>
      </p>
    );

  const numItems = item.length;
  const numCompleted = item.filter((item) => item.completed).length;
  const percentage = Math.round((numCompleted / numItems) * 100);
  return (
    <div className="footer">
      <em>
        {percentage === 100
          ? "Ты молодец, все сделано"
          : `Задач всего: ${numItems}. Сделано: ${numCompleted} (${percentage}%)`}
      </em>
    </div>
  );
}
