import { useContext } from "react";
import { Item, ItemsContext } from "../App";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const items = useContext(ItemsContext);
  return (
    <ul className="todo-list">
      {items.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
