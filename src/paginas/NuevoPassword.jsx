import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordActualizado, setPasswordActualizado] = useState(false);

  const params = useParams();
  const { token } = params;

  // Validar token
  useEffect(() => {
    const validarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({ msg: 'Coloca tu Nuevo Password'});
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: 'Hubo un error en el enlace', error: true });
        console.log(error);
      }
    }
    validarToken();
  }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar password >= 6
    if (password.trim().length < 6) {
      setAlerta({ msg: 'La contraseña debe tener un mínimo de 6 caracteres', error: true});
      return;
    }

    // Guardar nueva contraseña
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({ msg: data.msg });
      setPasswordActualizado(true);
      setPassword('');
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  }

  const { msg } = alerta;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl my-5">
            Reestablece tu <span className="text-pink-700">Contraseña</span> y no Pierdas <span className="text-pink-700">Acceso</span> a tus Pacientes
          </h1>
        </div>

        <div className='px-5 py-1 shadow rounded-xl bg-white'>
            { msg && <Alerta 
              alerta={alerta}
            />}

            { tokenValido && (
              <form
                onSubmit={handleSubmit}
              >
                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Nueva Contraseña</label>
                  <input 
                    type="password" 
                    placeholder="Nueva Contraseña"
                    className="border w-full mt-3 bg-gray-50 rounded-sm p-2"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                  />
                </div>

                <input 
                  type="submit" 
                  value="Reestablecer Contraseña" 
                  className="bg-indigo-700 w-full py-3 rounded-md text-white uppercase font-bold my-3 hover:cursor-pointer hover:bg-indigo-800"
                />
              </form>
            )}

            { passwordActualizado && (
              <nav className='my-5 flex justify-center'>
                <Link to="/" className='block text-center text-indigo-600 hover:text-indigo-800'>Iniciar Sesión</Link>
              </nav>
            )}
        </div>
    </>
  )
}

export default NuevoPassword;