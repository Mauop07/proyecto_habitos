'use client'; 
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHabitos, marcarHabitoDone, agregarHabito } from '../store/habitoSlice';
import { loginUser, registerUser, logout } from '../store/authSlice';
import './globals.css';

export default function Home() {
  const dispatch = useDispatch();
  const { usuarioId } = useSelector((state) => state.auth);
  const { lista: habitos } = useSelector((state) => state.habitos);

  // Estados locales para formularios
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [nuevoHabitoNombre, setNuevoHabitoNombre] = useState('');

  // Cargar hábitos cuando hay un usuario activo
  useEffect(() => {
    if (usuarioId) {
      dispatch(fetchHabitos(usuarioId));
    }
  }, [usuarioId, dispatch]);

  const manejarAuth = (e) => {
    e.preventDefault();
    if (isRegistering) {
      dispatch(registerUser({ email, password }));
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  const manejarNuevoHabito = (e) => {
    e.preventDefault();
    if (!nuevoHabitoNombre.trim()) return;
    dispatch(agregarHabito({ nombre: nuevoHabitoNombre, usuario: usuarioId }));
    setNuevoHabitoNombre('');
  };

  // PANTALLA DE LOGIN / REGISTRO
  if (!usuarioId) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h1>
          <form onSubmit={manejarAuth} className="space-y-4">
            <input 
              type="email" placeholder="Correo electrónico" required
              className="w-full p-3 border rounded-lg"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" placeholder="Contraseña" required
              className="w-full p-3 border rounded-lg"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
              {isRegistering ? 'Registrarse' : 'Entrar'}
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </p>
        </div>
      </main>
    );
  }

  // PANTALLA PRINCIPAL DE HÁBITOS
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mis Hábitos Atómicos</h1>
          <button onClick={() => dispatch(logout())} className="text-red-500 font-semibold hover:underline">
            Cerrar Sesión
          </button>
        </div>

        {/* Formulario para agregar hábito */}
        <form onSubmit={manejarNuevoHabito} className="mb-8 flex gap-4">
          <input 
            type="text" placeholder="Ej. Leer 10 páginas, Hacer ejercicio..." 
            className="flex-1 p-3 border rounded-lg shadow-sm"
            value={nuevoHabitoNombre} onChange={(e) => setNuevoHabitoNombre(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all">
            + Agregar
          </button>
        </form>

        <div className="space-y-6">
          {habitos.map((habito) => (
            <div key={habito._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">{habito.nombre}</h2>
                <button 
                  onClick={() => dispatch(marcarHabitoDone(habito._id))}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all active:scale-95 shadow-sm"
                >
                  Done
                </button>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
                    Día {habito.progreso} de 66
                  </span>
                </div>
                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
                  <div
                    style={{ width: `${(habito.progreso / 66) * 100}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                      habito.progreso < 33 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
          {habitos.length === 0 && (
            <p className="text-center text-gray-500 italic mt-8">Aún no tienes hábitos. ¡Agrega uno arriba para empezar tu racha!</p>
          )}
        </div>
      </div>
    </main>
  );
}