import EditContainer from "./editContainer";

function Task(props) {

    return <li className="todo-item">
        <button  className="button-check" data-action='checkButton'>
            <i className={`fas fa-check displayNone`} data-action='checkButton'></i>
        </button>
        <p className="task-name">{props.nameTask}</p>
        <i className="fas fa-edit" data-action='iconEditButton'></i>
        <EditContainer nameTask={props.nameTask}/>
        <i className="fas fa-trash-alt" data-action='deleteButton'></i>
    </li>
}

export default Task;