import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Tarea from "./components/Tarea";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer, Zoom } from "react-toastify";

const App = () => {
  const tareasDeEjemplo = [
    { id: 1, tarea: "Comprar pan", completed: false },
    { id: 2, tarea: "Llamar al doctor", completed: true },
    { id: 3, tarea: "Leer un libro", completed: false }
  ];

  const [inputValue, setInputValue] = useState("");
  const [tareas, setTareas] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem("todoItems");
    if (data !== null) {
      setTareas(JSON.parse(data));
    } else {
      setTareas(tareasDeEjemplo);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const data = JSON.stringify(tareas);
      window.localStorage.setItem("todoItems", data);
    }
  }, [tareas, isMounted]);

  const toggleTarea = (id) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
    ));
  };


  const borrarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  const inputEscribirTarea = (e) => {
    setInputValue(e.target.value);
  };

  const agregarTarea = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Escribe una tarea", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    } else {
      const nuevaTarea = {
        id: Date.now(),
        tarea: inputValue,
        completed: false
      };
      setTareas([...tareas, nuevaTarea]);
      setInputValue("");
    }
  };

  return (
    <>
      <div className="mx-auto pt-10 px-4 h-screen w-4/5 max-w-7xl">
        <Navbar inputValue={inputValue} agregarTarea={agregarTarea} inputEscribirTarea={inputEscribirTarea} />
        <div className="text-center mt-4 text-2xl">
          <p>Lista de Tareas</p>
        </div>
        <div className="mt-4">
          {
            tareas.map(tarea =>
              <Tarea key={tarea.id} id={tarea.id} tarea={tarea.tarea} completed={tarea.completed}
                borrarTarea={borrarTarea} toggleTarea={toggleTarea} />
            )
          }
        </div>
      </div>
      <ToastContainer className="" />
    </>
  );
};

export default App;
