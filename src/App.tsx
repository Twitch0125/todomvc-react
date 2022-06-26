import React, { createContext, useReducer, useState } from "react";
import logo from "./logo.svg";
import { NavLink, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";

export interface Item {
  name: string;
  id: string;
  isDone: boolean;
}

export const ItemsContext = createContext<Item[]>([]);
export const ItemsDispatchContext = createContext<
  React.Dispatch<{
    type: string;
    data: any;
  }>
>(() => ({}));

function itemsReducer(items: Item[], action: { type: string; data: any }) {
  switch (action.type) {
    case "add": {
      return [...items, action.data];
    }
    case "remove": {
      return items.filter((item) => item.id != action.data.id);
    }
    case "updateOne": {
      return items.map((item) => {
        if (item.id === action.data.id) {
          return action.data;
        } else {
          return item;
        }
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function App() {
  const [items, dispatch] = useReducer(itemsReducer, [] as Item[]);

  const [newItem, setNewItem] = useState<Item>({
    id: crypto.randomUUID(),
    name: "",
    isDone: false,
  });

  const addItem = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      dispatch({ type: "add", data: newItem });
      setNewItem({
        id: crypto.randomUUID(),
        name: "",
        isDone: false,
      });
    }
  };

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newItem.name}
            onInput={(event) =>
              setNewItem({ ...newItem, name: event.target.value })
            }
            onKeyUp={addItem}
            autoFocus=""
          />
        </header>
        {/* This section should be hidden by default and shown when there are todos */}
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ItemsContext.Provider value={items}>
            <ItemsDispatchContext.Provider value={dispatch}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/active" element={<Active />} />
                <Route path="/completed" element={<Completed />} />
              </Routes>
            </ItemsDispatchContext.Provider>
          </ItemsContext.Provider>
        </section>
        {/* This footer should be hidden by default and shown when there are todos */}
        <footer className="footer">
          {/* This should be `0 items left` by default */}
          <span className="todo-count">
            <strong>0</strong> item left
          </span>
          {/* Remove this if you don't implement routing */}
          <ul className="filters">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "selected" : "")}
                to="/"
              >
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "selected" : "")}
                to="/active"
              >
                Active
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "selected" : "")}
                to="/completed"
              >
                Completed
              </NavLink>
            </li>
          </ul>
          {/* Hidden if no completed items are left ↓ */}
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        {/* Remove the below line ↓ */}
        <p>
          Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
        </p>
        {/* Change this out with your name and url ↓ */}
        <p>
          Created by <a href="http://todomvc.com">you</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
      {items.map((item) => (
        <div key={item.id}>
          <div>{item.name}</div>
          <div>done: {item.isDone ? "true" : "false"}</div>
        </div>
      ))}
    </>
  );
}

export default App;

function Home() {
  return (
    <>
      <TodoList />
    </>
  );
}

function Active() {
  return (
    <>
      <TodoList />
    </>
  );
}

function Completed() {
  return (
    <>
      <TodoList />
    </>
  );
}
