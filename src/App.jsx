import { useEffect, useState } from "react";
import "./index.css";
import { Form } from "./components/Form";
import { Itemlist } from "./components/Itemlist";
import { Stats } from "./components/Stats";

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
    const confirmed = window.confirm("Вы уверены, что хотите все удалить?");

    if (confirmed) setItem([]);
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
