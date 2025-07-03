import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const camposObligatorios = { email, password };
    const camposVacios = Object.values(camposObligatorios).some(value => value.trim() === '');

    // Validar Campos Vacíos
    if (camposVacios) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    // Autenticar ususario
    try {
      const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
      console.log(data);
      localStorage.setItem('apv_token', data.token);
      setAuth(data);
      navigate('/admin');
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true});
    }
  }

  const { msg } = alerta;

  return (
    <> 
      <div>
        <h1 className="text-indigo-600 font-black text-6xl my-5 ">
          Inicia <span className="text-pink-700">Sesión</span> y <span className="text-pink-700">Administra</span> tus Pacientes
        </h1>
      </div>

      <div className='px-5 py-1 shadow rounded-xl bg-white'>
        { msg && <Alerta 
          alerta={alerta}
        />}

        <form onSubmit={handleSubmit}>
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

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
            <input 
              type="password" 
              placeholder="Contraseña"
              className="border w-full mt-3 bg-gray-50 rounded-sm p-2"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input 
            type="submit" 
            value="Iniciar Sesión" 
            className="bg-indigo-700 w-full py-3 rounded-md text-white uppercase font-bold my-3 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>

        <nav className='my-5 flex flex-col gap-3 lg:flex-row lg:justify-between'>
          <Link to="/registrar" className='block text-center text-indigo-600 hover:text-indigo-800'>¿No tienes una cuenta? Crea una</Link>
          <Link to="/olvide-password" className='block text-center text-indigo-600 hover:text-indigo-800'>Olvidé mi contraseña</Link>
        </nav>
      </div>
    </>
  )
}

export default Login