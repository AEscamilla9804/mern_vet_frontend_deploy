import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePacientes from "../hooks/usePacientes";

const Header = () => {
    const { cerrarSesion } = useAuth();
    const { resetPacientes } = usePacientes();

  return (
    <header 
        className="min-w-screen p-10 bg-indigo-600 container mx-auto flex flex-col gap-5 items-center 
        md:flex-row md:justify-between"
    >
        <h1 className="font-bold text-2xl text-indigo-200 text-center md:text-justify">Administrador de Pacientes de {''}
            <span className="text-white font-black">Veterinaria</span>
        </h1>

        <nav className="flex justify-between gap-5">
            <Link to='/admin' className="text-white text-md font-bold hover:text-indigo-200">Pacientes</Link>
            <Link to='/admin/perfil' className="text-white text-md font-bold hover:text-indigo-200">Perfil</Link>
            <button 
                type="button"
                className="text-white text-md font-bold hover:text-indigo-200 hover:cursor-pointer"
                onClick={() => {
                    resetPacientes(); 
                    cerrarSesion();
                }}
            >Cerrar Sesión</button>
        </nav>
    </header>
  )
}

export default Header