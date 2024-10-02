import React from "react";

function TaskInput({
  inputTimeValue,
  inputTextValue,
  setInputTimeValue,
  setInputTextValue,
  handleAddTask,
}) {
  return (
    <div className="inputAll">
      <div className="inputs">
        <input
          id="date"
          className="input"
          type="time"
          value={inputTimeValue}
          onChange={(e) => setInputTimeValue(e.target.value)}
        />
        <button id="btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <input
        id="text"
        className="input"
        type="text"
        value={inputTextValue}
        onChange={(e) => setInputTextValue(e.target.value)}
        placeholder="Add a new task"
      />
    </div>
  );
}

export default TaskInput;
