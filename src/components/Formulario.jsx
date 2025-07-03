import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({});

    const { guardarPacientes, paciente } = usePacientes();

    useEffect(()=> {
        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha.split('T')[0])
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault();

        const paciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        const camposVacios = Object.values(paciente).some(value => value.trim() === '');

        // Empty field validation
        if (camposVacios) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});
            return;
        }

        // Enviar los datos del formulario al Provider
        guardarPacientes({ nombre, propietario, email, fecha, sintomas, id });

        setAlerta({
            msg: 'Cambios Guardados Correctamente'
        });

        // Reiniciar formulario después de edición
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');

        // Eliminar Alerta de la pantalla
        setTimeout(() => {
            setAlerta({});
        }, 3000);
    }

    const { msg } = alerta;

  return (
    <div className="flex flex-col gap-5">
        <button 
                type="button"
                className='bg-indigo-600 text-white font-bold uppercase p-2 rounded-md hover:cursor-pointer hover:bg-indigo-800 md:hidden'
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >{ mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>

        <div className={ `${ mostrarFormulario ? 'block' : 'hidden' } flex flex-col gap-5 md:flex` }>
            <p
                className="text-2xl text-center font-bold"
            >Registra tus pacientes y <span className="text-indigo-600">Adminístralos</span></p>

            <form 
                className="flex flex-col gap-3 bg-white shadow-md py-3 px-4 rounded-md"
                onSubmit={handleSubmit}
            >
                { msg && <Alerta alerta={alerta} />}
                
                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Mascota</label>
                    <input 
                        type="text" 
                        id="nombre"
                        placeholder="Nombre de la Mascota"
                        className="border w-full rounded-md p-2"
                        value={ nombre }
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Propietario</label>
                    <input 
                        type="text" 
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border w-full rounded-md p-2"
                        value={ propietario }
                        onChange={ e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >Email Propietario</label>
                    <input 
                        type="text" 
                        id="email"
                        placeholder="Email del Propietario"
                        className="border w-full rounded-md p-2"
                        value={ email }
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha Alta</label>
                    <input 
                        type="date" 
                        id="fecha"
                        className="border w-full rounded-md p-2"
                        value={ fecha }
                        onChange={ e => setFecha(e.target.value) }
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >Síntomas</label>
                    <textarea  
                        id="sintomas"
                        placeholder="Describe los síntomas"
                        className="border w-full rounded-md p-2"
                        value={ sintomas }
                        onChange={ e => setSintomas(e.target.value) }
                    />
                </div>

                <input 
                    type="submit" 
                    value={ id ? 'Guardar Cambios' : "Registrar Paciente" } 
                    className="bg-indigo-600 w-full p-2 text-white uppercase font-bold hover:bg-indigo-800 hover:cursor-pointer rounded-md my-3"
                />
            </form>
        </div>
    </div>
  )
}

export default Formulario