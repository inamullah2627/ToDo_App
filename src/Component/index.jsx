import React, { useState } from "react";
import "./index.css";
const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditID] = useState(null);

  const addTask = (event) => {
    event.preventDefault();
    if (newTask?.trim() === "") {
      alert("Task cannot empty");
      return;
    }
    if (editId) {
      console.log("newTask: ", newTask);
      const newList = tasks.map((item) => {
        if (item.id === editId) {
          return { ...item, text: newTask };
        } else {
          return item;
        }
      });
      setTasks(newList);
      console.log("newList: ", newList);
      setNewTask("");
      setEditID(null);
      return;
    }
    const forDuplicate = tasks.some(
      (task) => task.text.toLowerCase() === newTask.toLowerCase()
    );

    if (forDuplicate) {
      alert("Tasks already exsits!");
    } else {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const delAll = () => {
    setTasks([]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const EditTask = (id) => {
    const selectedTask = tasks.find((task) => task.id === id);

    console.log("Task id: ", id);
    console.log("editTask: ", selectedTask);
    setNewTask(selectedTask.text);
    setEditID(id);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="container  mt-4 bg-light py-4 border">
      <h1 className="bg-primary text-white ">ToDo App</h1>
      <form className="input-group px-4" onSubmit={addTask}>
        <input
          className="mt-4 form-control"
          type="text"
          value={newTask}
          onChange={handleChange}
          placeholder="Enter your text"
        />
        <button
          className="btn-width mt-4 input-group-text bg-success text-white fs-5 border-0"
          type="submit"
        >
          {editId ? "Update Item" : "Add New Item"}
        </button>
      </form>
      {tasks.length > 0 && (
        <button
          className="mt-2 bg-danger text-white fs-5 border-0 rounded-1 shadow"
          onClick={delAll}
        >
          Delete All
        </button>
      )}

      <ul className="bg-secondary mt-4 list-group list-group-numbered">
        {tasks.map((task) => (
          <li
            className="list-group-item d-flex justify-content-around align-items-center"
            key={task.id}
          >
            <span className="fs-5 fixed-width">{task.text}</span>
            <div>
              <button
                className="bg-danger text-white fs-5 border-0 px-2"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
              <button
                className="bg-success text-white fs-5 border-0 ms-2 px-2"
                onClick={() => EditTask(task.id)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
