import { ChangeEvent, useContext, useState } from "react";
import { Item, ItemsDispatchContext } from "../App";

export default function TodoItem({ item = {} as Item }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(ItemsDispatchContext);

  const itemClasses = (): string => {
    const classes: string[] = [];
    item.isDone && classes.push("completed");
    isEditing && classes.push("editing");
    return classes.toString();
  };
  const checkItem = (event: ChangeEvent) => {
    dispatch({
      type: "updateOne",
      data: { ...item, isDone: event.target.checked },
    });
  };
  const doubleClick = () => {
    setIsEditing(!isEditing);
  };

  const editItem = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      dispatch({
        type: "updateOne",
        data: {
          ...item,
          name: event.target.value,
        },
      });
      setIsEditing(false);
    }
  };
  return (
    <li onDoubleClick={doubleClick} className={itemClasses()}>
      {/* List items should get the class `editing` when editing and `completed` when marked as completed */}
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={item.isDone}
          onChange={checkItem}
        />
        <label>{item.name}</label>
        <button className="destroy" />
      </div>
      <input onKeyUp={editItem} className="edit" defaultValue={item.name} />
    </li>
  );
}
