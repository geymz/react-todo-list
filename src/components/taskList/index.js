import React from "react";

function TaskList({ tasks, handleTaskClick }) {
  return (
    <div className="listArea">
      <ul className="lists">
        {tasks.map((task, i) => (
          <li onClick={() => handleTaskClick(task)} className="list" key={i}>
            {task.time} - {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
