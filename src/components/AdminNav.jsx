import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="flex gap-5">
        <Link 
            to='/admin/perfil' 
            className="text-indigo-600 text-md font-bold hover:text-indigo-800"
        >Perfil</Link>
        <Link 
            to='/admin/cambiar-password' 
            className="text-indigo-600 text-md font-bold hover:text-indigo-800"
        >Cambiar Contraseña</Link>
    </nav>
  )
}

export default AdminNav