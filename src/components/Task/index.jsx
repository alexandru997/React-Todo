import React from "react";

import axios from "axios";
import Task from "./Task";

import AddTaskForm from "./AddTaskForm";
import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

const Tasks = ({
  list,
  onEditTitle,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  onAddTask,
  whitoutEmpty,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("List name", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Error !!!");
        });
    }
  };
  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="pen" />
      </h2>

      <div className="tasks__items">
        {!whitoutEmpty && !list.tasks.length && <h1>No tasks ...</h1>}
        {list.tasks.map((task) => (
          <Task
            key={task.id}
            list={list}
            onEdit={onEditTask}
            onRemove={onRemoveTask}
            onComplete={onCompleteTask}
            {...task}
          />
        ))}

        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
