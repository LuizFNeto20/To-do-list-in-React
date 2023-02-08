import './List.css';
import Task from './Task';
import { useState } from "react"

function List() {
  const [user, setUser] = useState({ arrTask: [] })

  function createNewTask(nameTask) {
    let task = user.arrTask;

    task.push({
      name: nameTask,
      createAt: Date.now(),
      completed: false
    })

    setUser({ arrTask: task });
  }

  function clickedUl(event) {
    //Pega o elemento que tiver o atributo "d"ata-action".
    const dataAction = event.target.getAttribute("data-action");

    //se não tiver ele para a função.
    if (!dataAction) {
      return
    }

    //coloca a tarefa(li) clicada na variavel.
    let currentLi = event.target;
    while (currentLi.nodeName !== "LI") {
      currentLi = currentLi.parentElement;
    }

    const listTask = [...currentLi.parentElement.children];

    //encontra o indece da tarefa(li).
    const currentLiIndex = listTask.indexOf(currentLi);

    //objeto que contem todos os eventos necessarios.
    const actions = {
      checkButton: function () {
        user.arrTask[currentLiIndex].completed = !user.arrTask[currentLiIndex].completed;

        currentLi.querySelector("i").classList.toggle("displayNone");
      },
      iconEditButton: function () {
        const editContainer = currentLi.querySelector(".editContainer");

        [...currentLi.parentElement.querySelectorAll(".editContainer")].forEach((container) => {
          container.removeAttribute("style");
        });

        editContainer.style.display = "flex";
      },
      editButton: function () {
        const editTask = [...user.arrTask]
        const editInput = currentLi.querySelector(".editInput").value;

        editTask[currentLiIndex].name = editInput;

        setUser({ arrTask: editTask })
      },
      cancelButton: function () {
        currentLi.querySelector(".editContainer").removeAttribute("style");

        currentLi.querySelector(".editInput").value = user.arrTask[currentLiIndex].name;
      },
      deleteButton: function () {
        const deleteTask = [...user.arrTask]

        deleteTask.splice(currentLiIndex, 1);

        setUser({ arrTask: deleteTask })
      },
    }

    //executa a função de acordo com o objeto.
    if (actions[dataAction]) {
      actions[dataAction]();
    }
  }

  const renderTasks = user.arrTask.map((task) => { return <Task nameTask={task.name} /> })

  return (
    <div className="todo-list__app">
      <div className="todo-add-item__container">
        <h1 className="heading">todo List</h1>
        <form onSubmit={(event) => {
          event.preventDefault()

          createNewTask(event.target.firstChild.value)

          event.target.firstChild.value = "";
          event.target.firstChild.focus();
        }} action="#" className="todo-add-item" id="todo-add">
          <input className="inputItem" autoFocus id="item-input" type="text" name="text" placeholder="New Item" />
          <input id="add-item" type="submit" value="Add" />
        </form>
      </div>
      <div className="todo-list__container">
        <ul onClick={clickedUl} id="todo-list">
          {
            user.arrTask.length > 0 ? renderTasks : ""
          }
        </ul>
      </div>
    </div>
  );
}

export default List;
