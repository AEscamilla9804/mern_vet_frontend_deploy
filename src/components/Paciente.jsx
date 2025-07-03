import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {
    const { nombre, propietario, email, fecha, sintomas, _id } = paciente;

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset());
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha);
    }

    const { setEdicion, eliminarPaciente } = usePacientes();

  return (
    <div className="flex flex-col gap-3 bg-white shadow-md py-3 px-4 rounded-md">
        <p className="text-gray-700 font-bold uppercase">
            Nombre: {''}
            <span className="font-normal normal-case">{nombre}</span>
        </p>
        <p className="text-gray-700 font-bold uppercase">
            Propietario: {''}
            <span className="font-normal normal-case">{propietario}</span>
        </p>
        <p className="text-gray-700 font-bold uppercase">
            Email: {''}
            <span className="font-normal normal-case">{email}</span>
        </p>
        <p className="text-gray-700 font-bold uppercase">
            Fecha de Alta: {''}
            <span className="font-normal normal-case">{formatearFecha(fecha)}</span>
        </p>
        <p className="text-gray-700 font-bold uppercase">
            Síntomas: {''}
            <span className="font-normal normal-case">{sintomas}</span>
        </p>

        <div className="flex justify-between mt-1">
            <button 
                type="button"
                className="py-2 px-6 bg-indigo-600 uppercase font-bold rounded-md text-white hover:bg-indigo-800 hover:cursor-pointer"
                onClick={() => setEdicion(paciente)}
            >
                Editar
            </button>

            <button 
                type="button"
                className="py-2 px-6 bg-red-600 uppercase font-bold rounded-md text-white hover:bg-red-800 hover:cursor-pointer"
                onClick={() => eliminarPaciente(_id)}
            >
                Eliminar
            </button>
        </div>
    </div>
  )
}

export default Paciente