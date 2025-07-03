import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar campo vacío
    if (email.trim() === '' || email.trim().length < 6) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }

    // Solicitar cambio de password
    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });
      setAlerta({ msg: data.msg });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl my-5">
            Recupera tu <span className="text-pink-700">Acceso</span> y no <span className="text-pink-700">Pierdas</span> tus Pacientes
          </h1>
      </div>

      <div className='px-5 py-1 shadow rounded-xl bg-white'>
        { msg && <Alerta 
          alerta={alerta}
        />}

        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input 
              type="email" 
              placeholder="Email de Registro"
              className="border w-full mt-3 bg-gray-50 rounded-sm p-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input 
            type="submit" 
            value="Enviar Instrucciones" 
            className="bg-indigo-700 w-full py-3 rounded-md text-white uppercase font-bold my-3 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>

        <nav className='my-5 flex flex-col gap-3 lg:flex-row lg:justify-between'>
          <Link to="/" className='block text-center text-indigo-600 hover:text-indigo-800'>¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link to="/registrar" className='block text-center text-indigo-600 hover:text-indigo-800'>¿No tienes una cuenta? Crea una</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword