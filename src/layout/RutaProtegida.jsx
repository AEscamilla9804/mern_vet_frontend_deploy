import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();

    if (cargando) return 'Los datos están cargando...';

  return (
    <>
        <div className="w-screen min-h-screen flex flex-col bg-gray-100">
            <Header />
                <main className="p-10 flex-grow">
                    { auth?._id ? <Outlet /> : <Navigate to="/" />}
                </main>
            <Footer />
        </div>
    </>
  )
}

export default RutaProtegida