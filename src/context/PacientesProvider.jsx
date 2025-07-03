import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    const { auth } = useAuth();

    useEffect(() => {
      const obtenerPacientes = async () => {
        try {
            // Recuperar el token
            const token = localStorage.getItem('apv_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/pacientes', config);
            setPacientes(data);
        } catch (error) {
            console.log(error);
        }
      }
      obtenerPacientes();
    }, [auth])

    const guardarPacientes = async (paciente) => {
        const token = localStorage.getItem('apv_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error);
            }
            return;
        }

        try {
            // Guardar datos del paciente en la BD
            const { data } = await clienteAxios.post('/pacientes', paciente, config);

            // eslint-disable-next-line no-unused-vars
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
            setPacientes([pacienteAlmacenado, ...pacientes]);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const resetPacientes = () => {
        setPacientes([]);
        setPaciente({});
    }

    const setEdicion = paciente => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async id => {
        const confirmacionUsuario = confirm('¿Deseas Eliminar el Registro?');

        if (!confirmacionUsuario) return;

        // Eliminar Registro del Paciente
        try {
            const token = localStorage.getItem('apv_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await clienteAxios.delete(`/pacientes/${id}`, config);
            const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);

            setPacientes(pacientesActualizado);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <PacientesContext.Provider
            value={{ 
                pacientes, 
                guardarPacientes, 
                resetPacientes,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export { PacientesProvider };
export default PacientesContext;