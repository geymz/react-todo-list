import React from "react";
//import styles from "./styles.module.scss";

function TaskDetail({
  tasks,
  selectedTask,
  handleTaskClick,
  handleDelete,
  detailBoxRef,
}) {
  return (
    /**
     *
     *  <div className={styles.container}>
     *    <ul className={styles.box}>
     *      <li className={styles.items}>item1</li>
     *    </ul>
     *  </div>
     *    
     * className yerine styles.value belirtmemizin sebebi modüler yapının 
     * otomatik bir şekilde isimlendirme yapmasıdır bu şekilde 
     * proje ne kadar büyük olursa olsun className değerleri asla karışmayacak
     * 
     */

    <div ref={detailBoxRef} className="detailBox">
      <ul className="detailBoxUl">
        {tasks.map((task, i) => (
          <li
            className={`detailBoxLi${selectedTask === task ? " openPage" : ""}`}
            data-task-id={task.time}
            key={i}
          >
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
  );
}

export default TaskDetail;
