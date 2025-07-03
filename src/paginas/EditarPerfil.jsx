import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth();

    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});
    
    useEffect(() => {
        setPerfil(auth);
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();

        // Validar campos vacíos (req: nombre e email)
        const { nombre, email } = perfil;

        if ([nombre, email].includes('')) {
            setAlerta({ msg: 'Los Campos Email y Nombre son Obligatorios', error: true });
            return;
        }

        const resultado = await actualizarPerfil(perfil);

        if (resultado) {
            setAlerta(resultado);
        }

        setTimeout(() => {
            setAlerta({});
        }, 5000);
    }

    const { msg } = alerta;

  return (
    <>
        <div className="flex flex-col gap-5 md:gap-3">
            <div className="flex justify-center md:justify-start">
                <AdminNav />
            </div>

            <div className="flex flex-col gap-3 items-center">
                <h2 className="font-black text-3xl">Editar Perfil</h2>
                <p className="text-xl">Actualiza tu <span className="text-indigo-600 font-bold">Información</span> Aquí</p>
            </div>

            <div className="flex flex-col items-center">
                <form
                    className="w-full flex flex-col gap-3 bg-white shadow-md py-3 px-4 rounded-md md:w-1/2"
                    onSubmit={handleSubmit}
                >
                    { msg && <Alerta 
                        alerta={alerta}
                    />}

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-gray-700 uppercase font-bold"
                        >Nombre</label>
                        <input 
                            type="text" 
                            name="nombre"
                            placeholder="Nombre"
                            className="border bg-gray-50 w-full rounded-md p-2"
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil({
                                ...perfil, 
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-gray-700 uppercase font-bold"
                        >Sitio Web</label>
                        <input 
                            type="text" 
                            name="web"
                            placeholder="Sitio Web"
                            className="border bg-gray-50 w-full rounded-md p-2"
                            value={perfil.web || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-gray-700 uppercase font-bold"
                        >Teléfono</label>
                        <input 
                            type="text" 
                            name="telefono"
                            placeholder="Teléfono"
                            className="border bg-gray-50 w-full rounded-md p-2"
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label 
                            className="text-gray-700 uppercase font-bold"
                        >Email</label>
                        <input 
                            type="text" 
                            name="email"
                            placeholder="Email"
                            className="border bg-gray-50 w-full rounded-md p-2"
                            value={perfil.email || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value='Actualizar Información'
                        className="bg-indigo-600 w-full p-2 text-white uppercase font-bold hover:bg-indigo-800 hover:cursor-pointer rounded-md my-3"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil