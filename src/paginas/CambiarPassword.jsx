import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  const { guardarPassword } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar Campos Vacíos
    const camposVacios = Object.values(password).some(value => value.trim() === '');

    if (camposVacios) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }

    // Validar extension password
    if (password.pwd_nuevo.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener un mínimo de 6 caracteres', error: true });
      return;
    }

    // Validar password único
    if (password.pwd_actual === password.pwd_nuevo) {
      setAlerta({ msg: 'La contraseña nueva no puede ser la misma que la actual', error: true });
      return;
    }

    const respuesta = await guardarPassword(password);

    if (respuesta) {
        setAlerta(respuesta);
    }

    setTimeout(() => {
        setAlerta({});
    }, 5000);
  }

  const { msg } = alerta;
  return (
    <div className="flex flex-col gap-5 md:gap-3">
        <div className="flex justify-center md:justify-start">
            <AdminNav />
        </div>

        <div className="flex flex-col gap-3 items-center">
            <h2 className="font-black text-3xl">Cambiar Contraseña</h2>
            <p className="text-xl">Modifica tu <span className="text-indigo-600 font-bold">Contraseña</span> Aquí</p>
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
                        >Contraseña Actual</label>
                        <input 
                            type="password" 
                            name="pwd_actual"
                            placeholder="Escribe tu Contraseña Actual"
                            className="border bg-gray-50 w-full rounded-md p-2"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-gray-700 uppercase font-bold"
                        >Contraseña Nueva</label>
                        <input 
                            type="password" 
                            name="pwd_nuevo"
                            placeholder="Escribe la Contraseña Nueva"
                            className="border bg-gray-50 w-full rounded-md p-2"
                            onChange={e => setPassword({
                              ...password,
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
  )
}

export default CambiarPassword