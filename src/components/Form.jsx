import { useState } from "react";

export function Form({ onAddItems }) {
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
