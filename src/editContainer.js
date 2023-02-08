function EditContainer (props) {

    return (
        <div className="editContainer">
            <input className="editInput" type="text" defaultValue={props.nameTask}></input>
            <button className="editButton" data-action='editButton'>Edit</button>
            <button className="cancelButton" data-action='cancelButton'>Cancel</button>
        </div>
    )
}

export default EditContainer;

