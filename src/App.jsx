import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Tarea from "./components/Tarea";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer, Zoom } from "react-toastify";
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      const tareasCollection = collection(db, "tareas");
      const tareaSnapshot = await getDocs(tareasCollection);
      const tareaList = tareaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTareas(tareaList);
    };

    fetchTareas();
  }, [tareas]);

  const toggleTarea = async (id, completed) => {
    const tareaDoc = doc(db, "tareas", id);
    await updateDoc(tareaDoc, { completed: !completed });
    setTareas(tareas.map(tarea =>
      tarea.id === id ? { ...tarea, completed: !completed } : tarea
    ));
  };

  const borrarTarea = async (id) => {
    await deleteDoc(doc(db, "tareas", id));
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  const inputEscribirTarea = (e) => {
    setInputValue(e.target.value);
  };

  const agregarTarea = async (e) => {
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
        tarea: inputValue,
        completed: false
      };
      const docRef = await addDoc(collection(db, "tareas"), nuevaTarea);
      setTareas([...tareas, { id: docRef.id, ...nuevaTarea }]);
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
