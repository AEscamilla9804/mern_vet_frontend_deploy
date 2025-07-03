import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      { pacientes.length ? 
      (
        <div className="flex flex-col gap-5">
            <p className="text-2xl text-center font-bold">
              Administra tus {''} 
              <span className="text-indigo-600">Pacientes</span> y {''} 
              <span className="text-indigo-600">Citas</span>
            </p>

            { pacientes.map( paciente => (
              <Paciente 
                key={paciente._id}
                paciente={paciente}
              />
            ))}
        </div>
      ) : 
      (
        <>
          <h2 className="font-bold text-3xl text-center">No hay pacientes</h2>
          <p className="mt-5 text-xl text-center">Comienza agregando pacientes y se {''}
            <span className="text-indigo-600 font-bold">mostrarán</span> en esta sección
          </p>
        </>
      ) }
    </>
  )
}

export default ListadoPacientes