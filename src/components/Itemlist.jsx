import { useState } from "react";
import { Item } from "./Item";

export function Itemlist({
  item,
  onDeleteItem,
  onToggleItem,
  onDeleteAllItem,
}) {
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
