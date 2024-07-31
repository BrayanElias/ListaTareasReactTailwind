import { useState } from "react";
import Navbar from "./components/Navbar"
import Tarea from "./components/Tarea"

const App = () => {
  const [inputValue, setInputValue] = useState("")
  const [agregarTareaClick, setAgregarTareaClick] = useState([])

  function toggleTarea(id) {
    const tareasActualizadas = agregarTareaClick.map(tarea => {
      if (tarea.id === id) {
        return { ...tarea, completed: !tarea.completed };
      }
      return tarea;
    });
    setAgregarTareaClick(tareasActualizadas);
  }


  function borrarTarea(id) {
    const tareasActualizadas = agregarTareaClick.filter((tarea) => tarea.id !== id);
    setAgregarTareaClick(tareasActualizadas);
  }

  function inputEscribirTarea(e) {
    setInputValue(e.target.value);
  }

  function agregarTarea(e) {
    e.preventDefault()
    if (inputValue.trim() == "") {
      alert("Necesitas escribir algo")
    } else {
      const nuevaTarea = {
        id: Date.now(),
        tarea: inputValue,
        completed: false
      }
      setAgregarTareaClick([...agregarTareaClick, nuevaTarea])
      setInputValue("")
    }
  }

  return (
    <>
      <div className="mx-auto pt-10 px-4 h-screen w-4/5 max-w-7xl">
        <Navbar inputValue={inputValue} agregarTarea={agregarTarea} inputEscribirTarea={inputEscribirTarea} />
        <div className="text-center mt-4 text-2xl">
          <p>Lista de Tareas</p>
        </div>
        <div className="mt-4">
          {
            agregarTareaClick.map(tarea =>
              <Tarea key={tarea.id} id={tarea.id} tarea={tarea.tarea} completed={tarea.completed}
                borrarTarea={borrarTarea} toggleTarea={toggleTarea} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
