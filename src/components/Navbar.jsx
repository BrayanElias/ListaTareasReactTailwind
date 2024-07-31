
const Navbar = ({ agregarTarea, inputEscribirTarea ,inputValue}) => {
    return (
        <form className="flex items-center max-w-xl space-x-2 mx-auto" onSubmit={agregarTarea}>
            <input
                value={inputValue}
                onChange={inputEscribirTarea}
                type="text"
                placeholder="Agregar tarea"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                onClick={agregarTarea}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Agregar
            </button>
        </form>
    );
};

export default Navbar;
