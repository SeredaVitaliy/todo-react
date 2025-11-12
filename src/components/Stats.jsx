export function Stats({ item }) {
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
