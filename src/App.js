import { useEffect, useState, useRef } from "react"
import './css/style.css';
// import * as Icon from 'react-bootstrap-icons';
//import { FaTrash } from 'react-icons/fa';

function App() {

    const [tasks, setTasks] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });
    const [tasksText, setTasksText] = useState([]);

    const [inputTimeValue, setInputTimeValue] = useState('');
    const [inputTextValue, setInputTextValue] = useState('');

    const [showDetailBox, setShowDetailBox] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    let [sortedTasks, setSortedTasks] = useState([]);



    const detailBoxRef = useRef(null);

    const [showModalBackground, setShowModalBackground] = useState(false);


    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(tasks))
    }, [tasks])




    // useEffect(() => {
    //     setShowModalBackground(showDetailBox);
    // }, [showDetailBox]);





    const handleInputChangeTime = (event) => {
        setInputTimeValue(event.target.value);
    };

    const handleInputChangeText = (event) => {
        setInputTextValue(event.target.value);
    };

    const handleAddTask = () => {
        if (inputTimeValue.trim() !== '' && inputTextValue.trim() !== '') {
            const newTask = { time: inputTimeValue.trim(), text: inputTextValue.trim() };
            setTasks([...tasks, newTask]);
            setInputTimeValue('');
            setInputTextValue('');

            setSelectedTask(newTask);
        } else {
            alert('You must write something!');
        }
    };

    const handleTaskClick = (task) => {

        const prevSelectedItemLi = document.querySelector('.detailBoxLi.openPage');
        if (prevSelectedItemLi) {
            prevSelectedItemLi.classList.remove('openPage');
        }

        if (selectedTask !== task) {
            const selectedItemLi = document.querySelector(`.detailBoxLi[data-task-id="${task.time}"]`);
            if (selectedItemLi) {
                selectedItemLi.classList.add('openPage');
            }
        } else {
            setSelectedTask(null);
            setShowDetailBox(false);
        }

        setShowDetailBox(true);
        setSelectedTask(task);

        if (showDetailBox) {
            setShowModalBackground(true);
        } else {
            setShowModalBackground(false);
        }

    };

    sortedTasks = tasks.slice().sort((a, b) => a.time.localeCompare(b.time));
    const handleDelete = (taskToDelete) => {
        const updatedTasks = tasks.filter(task => task !== taskToDelete);
        setTasks(updatedTasks);
        setSelectedTask(null);
    };



    //
    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (detailBoxRef.current && !detailBoxRef.current.contains(event.target)) {
    //             setShowDetailBox(false);
    //             setSelectedTask(null);
    //         }
    //     }
    //
    //     function handleClickInside(event) {
    //         if (detailBoxRef.current && detailBoxRef.current.contains(event.target)) {
    //             event.stopPropagation();
    //         }
    //     }
    //
    //     if (window.innerWidth <= 861 && showDetailBox) {
    //         document.addEventListener("click", handleClickInside);
    //     } else {
    //         document.removeEventListener("click", handleClickInside);
    //     }
    //
    //     if (window.innerWidth <= 861) {
    //         document.addEventListener("click", handleClickOutside);
    //     } else {
    //         document.removeEventListener("click", handleClickOutside);
    //     }
    //
    //     return () => {
    //         document.removeEventListener("click", handleClickInside);
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, [showDetailBox]);




    sortedTasks.sort((a, b) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
    });

    // const filteredTasks = tasks.filter(task => task.time === selectedHour);

    return (
        <>

            <div className="total">
                <h1>Todo List </h1>
                <div className="todoListWrapper">
                    <div className='inputAll'>
                        <div className="inputs">
                            <input id="date" className="input" type="time" value={inputTimeValue}
                                   onChange={handleInputChangeTime}/>
                            <button id="btn" onClick={handleAddTask}>Add Task</button>
                        </div>
                        <input id="text" className="input" type="text" value={inputTextValue}
                               onChange={handleInputChangeText}
                               placeholder="Add a new task"/>
                    </div>
                    <div className="listArea">
                        <ul className="lists">
                            {sortedTasks.map((task, i) => (
                                <li onClick={() => handleTaskClick(task)} className="list" key={i}>
                                    {task.time}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {showDetailBox && <div className="modalBackground"></div>}

            {/*<div className="detailBox">*/}
            {/*    <ul className="detailBoxUl">*/}
            {/*        {sortedTasks.map((task, i) => (*/}
            {/*            <li className="detailBoxLi" data-task-id={task.time} key={i}>*/}
            {/*                <div className="list-all">*/}
            {/*                    <div onClick={() => handleTaskClick(task)} className="list">*/}
            {/*                        <p className="text-info"><b>{task.time}</b> - {task.text}</p>*/}
            {/*                    </div>*/}
            {/*                    <i onClick={() => handleDelete(task)} className="deleteItem">X</i>*/}
            {/*                </div>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}

            {showDetailBox && (
                <div ref={detailBoxRef} className="detailBox">
                    <ul className="detailBoxUl">
                        {sortedTasks.map((task, i) => (
                            <li className={`detailBoxLi${selectedTask === task ? " openPage" : ""}`} data-task-id={task.time} key={i}>
                                <div className="list-all">
                                    <div onClick={() => handleTaskClick(task)} className="list">
                                        <p className="text-info">
                                            <b>{task.time}</b> - {task.text}
                                        </p>
                                    </div>
                                    <i onClick={() => handleDelete(task)} className="deleteItem">
                                        X
                                    </i>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}



        </>
    );
}

export default App;
