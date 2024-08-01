
const Tarea = ({ tarea, borrarTarea, id, completed, toggleTarea }) => {
    return (
        <div className="my-4 max-w-96 border mx-auto">
            <div className="flex justify-between">
                <input type="checkbox" name="" id="" checked={completed} onChange={() => toggleTarea(id)} />
                <p className={completed ? "line-through" : ""}>{tarea}</p>
                <span className="cursor-pointer" onClick={() => borrarTarea(id)}>🗑️</span>
            </div>
        </div>
    )
}

export default Tarea
