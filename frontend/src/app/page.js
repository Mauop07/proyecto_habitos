'use client'; 
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHabitos, marcarHabitoDone, agregarHabito } from '../store/habitoSlice';
import { loginUser, registerUser, logout } from '../store/authSlice';
import './globals.css';

export default function Home() {
  const dispatch = useDispatch();
  
  const { usuarioId, status: authStatus } = useSelector((state) => state.auth);
  const { lista: habitos } = useSelector((state) => state.habitos);

  const [montado, setMontado] = useState(false);
  useEffect(() => {
    setMontado(true);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [nuevoHabitoNombre, setNuevoHabitoNombre] = useState('');

  useEffect(() => {
    if (usuarioId && montado) {
      dispatch(fetchHabitos());
    }
  }, [usuarioId, dispatch, montado]);

  const manejarAuth = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      const resultado = await dispatch(registerUser({ email, password }));
      if (registerUser.fulfilled.match(resultado)) {
        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        setIsRegistering(false); 
        setPassword(''); 
      } else {
        alert(resultado.payload || "Error en el registro. Intenta con otro correo.");
      }
    } else {
      const resultado = await dispatch(loginUser({ email, password }));
      if (loginUser.rejected.match(resultado)) {
        alert(resultado.payload || "Credenciales incorrectas.");
      }
    }
  };

  const manejarNuevoHabito = (e) => {
    e.preventDefault();
    if (!nuevoHabitoNombre.trim()) return;
    dispatch(agregarHabito({ nombre: nuevoHabitoNombre }));
    setNuevoHabitoNombre('');
  };

  if (!montado) return null;

  if (!usuarioId) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full border-t-4 border-blue-600">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {isRegistering ? 'Crea tu cuenta' : 'Iniciar Sesión'}
          </h1>
          <form onSubmit={manejarAuth} className="space-y-4">
            <input 
              type="email" placeholder="Correo electrónico" required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" placeholder="Contraseña" required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
              {authStatus === 'loading' ? 'Procesando...' : (isRegistering ? 'Registrarse' : 'Entrar')}
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600">
            {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'} 
            <span 
              className="text-blue-600 font-bold ml-1 cursor-pointer hover:underline" 
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Inicia sesión' : 'Regístrate aquí'}
            </span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Mis Hábitos Atómicos</h1>
            <p className="text-gray-500 text-sm font-medium">Semana 5 | Seguridad JWT Activa</p>
          </div>
          <button 
            onClick={() => dispatch(logout())} 
            className="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-red-50 border border-red-100 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        <form onSubmit={manejarNuevoHabito} className="mb-10 flex gap-4">
          <input 
            type="text" placeholder="¿Qué nuevo hábito vas a dominar?" 
            className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            value={nuevoHabitoNombre} onChange={(e) => setNuevoHabitoNombre(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">
            +
          </button>
        </form>

        <div className="space-y-4">
          {habitos.map((habito) => (
            <div key={habito._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-700">{habito.nombre}</h2>
                <button 
                  onClick={() => dispatch(marcarHabitoDone(habito._id))}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-90 shadow-sm"
                >
                  Done
                </button>
              </div>

              <div className="space-y-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${
                      habito.progreso > 20 ? 'bg-green-500' : 'bg-blue-500'
                    }`} 
                    style={{ width: `${Math.min((habito.progreso / 66) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Día {habito.progreso}</span>
                  <span>Meta: 66 días</span>
                </div>
              </div>
            </div>
          ))}

          {habitos.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 italic">No hay hábitos aún. Tu viaje comienza con un clic arriba.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}