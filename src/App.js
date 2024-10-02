import { useEffect, useState, useRef } from "react";
import "./styles/style.css";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils/localStorage";
import TaskDetail from "./components/taskDetail/index";
import TaskInput from "./components/taskInput/index";
import TaskList from "./components/taskList/index";

function App() {
  const [tasks, setTasks] = useState(() => loadFromLocalStorage("ITEMS", []));
  const [inputTimeValue, setInputTimeValue] = useState("");
  const [inputTextValue, setInputTextValue] = useState("");
  const [showDetailBox, setShowDetailBox] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const detailBoxRef = useRef(null);

  useEffect(() => {
    saveToLocalStorage("ITEMS", tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (inputTimeValue.trim() !== "" && inputTextValue.trim() !== "") {
      const newTask = {
        time: inputTimeValue.trim(),
        text: inputTextValue.trim(),
      };
      setTasks([...tasks, newTask]);
      setInputTimeValue("");
      setInputTextValue("");
      setSelectedTask(newTask);
    } else {
      alert("You must write something!");
    }
  };

  const handleTaskClick = (task) => {
    if (selectedTask !== task) {
      setSelectedTask(task);
      setShowDetailBox(true);
    } else {
      setSelectedTask(null);
      setShowDetailBox(false);
    }
  };

  const handleDelete = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const sortedTasks = tasks
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <>
      <div className="total">
        <h1>Todo List</h1>
        <div className="todoListWrapper">
          <TaskInput
            inputTimeValue={inputTimeValue}
            inputTextValue={inputTextValue}
            setInputTimeValue={setInputTimeValue}
            setInputTextValue={setInputTextValue}
            handleAddTask={handleAddTask}
          />
          <TaskList tasks={sortedTasks} handleTaskClick={handleTaskClick} />
        </div>
      </div>

      {showDetailBox && <div className="modalBackground"></div>}

      {showDetailBox && (
        <TaskDetail
          tasks={sortedTasks}
          selectedTask={selectedTask}
          handleTaskClick={handleTaskClick}
          handleDelete={handleDelete}
          detailBoxRef={detailBoxRef}
        />
      )}


    </>
  );
}

export default App;
