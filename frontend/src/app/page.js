import './globals.css';

export default function Home() {
  // Integración lista dinámica (Simulando datos que vendrían de Redux)
  const habitos = [
    { id: 1, nombre: "Leer 10 páginas", progreso: 15 },
    { id: 2, nombre: "Hacer ejercicio", progreso: 45 },
    { id: 3, nombre: "Meditar", progreso: 66 }
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Mis Hábitos Atómicos
        </h1>

        <div className="space-y-6">
          {habitos.map((habito) => (
            <div key={habito.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">{habito.nombre}</h2>
                {/* Integración botón de "Done" (no funcional por ahora) */}
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Done
                </button>
              </div>

              {/* Integración barra de progreso (de rojo a verde) */}
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
                      Día {habito.progreso} de 66
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
                  <div
                    style={{ width: `${(habito.progreso / 66) * 100}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      habito.progreso < 33 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}