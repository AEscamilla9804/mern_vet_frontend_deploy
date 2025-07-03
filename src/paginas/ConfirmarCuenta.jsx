import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }

      setCargando(false);
    }
    confirmarCuenta();
  }, [id]);

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl my-5">
            Confirma tu<span className="text-pink-700">Cuenta</span> y <span className="text-pink-700">Comienza</span> a Administrar tus Pacientes
          </h1>
      </div>

      <div className='px-5 py-1 shadow rounded-xl bg-white'>
        {!cargando && <Alerta 
          alerta={alerta}
        />}

        {cuentaConfirmada && 
          <nav className='my-5 flex flex-col gap-3'>
            <Link to="/" className='block text-center text-indigo-600 hover:text-indigo-800'>Iniciar Sesión</Link>
          </nav>
        }
      </div>
    </>
  )
}

export default ConfirmarCuenta