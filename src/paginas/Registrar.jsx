import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');

  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const camposObligatorios = { nombre, email, password, repetirPassword };

    // Validar campos vacíos
    const camposVacios = Object.values(camposObligatorios).some(value => value.trim() === '');

    if (camposVacios) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }

    // Validar contraseña
    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no coinciden', error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener un mínimo de 6 caracteres', error: true });
      return;
    }

    // Remove Alert from screen
    setAlerta({});

    // Crear usuario en la API
    try {
      await clienteAxios.post(`/veterinarios`, { nombre, email, password });
      setAlerta({
        msg: 'Creado Correctamente. Revisa tu email',
        error: false
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl my-5">
          Crea tu <span className="text-pink-700">Cuenta</span> y <span className="text-pink-700">Administra</span> tus Pacientes
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
            <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
            <input 
              type="text" 
              placeholder="Nombre"
              className="border w-full mt-3 bg-gray-50 rounded-sm p-2"
              value={ nombre }
              onChange={ e => setNombre(e.target.value) }
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input 
              type="email" 
              placeholder="Email de Registro"
              className="border w-full mt-3 bg-gray-50 rounded-sm p-2"
              value={ email }
              onChange={ e => setEmail(e.target.value) }
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
            <input 
              type="password" 
              placeholder="Contraseña"
              className="border w-full mt-3 bg-gray-50 rounded-sm p-2"
              value={ password }
              onChange={ e => setPassword(e.target.value) }
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Contraseña</label>
            <input 
              type="password" 
              placeholder="Repite tu Contraseña"
              className="border w-full mt-3 bg-gray-50 rounded-sm p-2"
              value={ repetirPassword }
              onChange={ e => setRepetirPassword(e.target.value) }
            />
          </div>

          <input 
            type="submit" 
            value="Crear Cuenta" 
            className="bg-indigo-700 w-full py-3 rounded-md text-white uppercase font-bold my-3 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>

        <nav className='my-5 flex flex-col gap-3 lg:flex-row lg:justify-between'>
          <Link to="/" className='block text-center text-indigo-600 hover:text-indigo-800'>¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link to="/olvide-password" className='block text-center text-indigo-600 hover:text-indigo-800'>Olvidé mi contraseña</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar