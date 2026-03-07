import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
const FormularioMetricas = ({ onActualizar }) => {
  const [form, setForm] = useState({ mes: '', conversiones: '', cpl: '', trafico: '' });

  const enviarDatos = async (e) => {
    e.preventDefault();
    await fetch('https://backend-saas-marketing.onrender.com/api/metricas-manual/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ mes: '', conversiones: '', cpl: '', trafico: '' });
    onActualizar(); // Recarga la gráfica
  };

  return (
    <form onSubmit={enviarDatos} className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-2 gap-4">
      <input className="border p-2 rounded" placeholder="Mes (ej. Ago)" value={form.mes} onChange={e => setForm({...form, mes: e.target.value})} required />
      <input className="border p-2 rounded" type="number" placeholder="Conversiones" value={form.conversiones} onChange={e => setForm({...form, conversiones: e.target.value})} required />
      <input className="border p-2 rounded" type="number" step="0.01" placeholder="CPL ($)" value={form.cpl} onChange={e => setForm({...form, cpl: e.target.value})} required />
      <input className="border p-2 rounded" type="number" placeholder="Tráfico" value={form.trafico} onChange={e => setForm({...form, trafico: e.target.value})} required />
      <button className="col-span-2 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">Guardar Nueva Métrica</button>
    </form>
  );
};

function App() {
  // ... aquí va todo tu código actual (useState, useEffect, handleLogin, etc.)
function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
  const [estaAutenticado, setEstaAutenticado] = useState(false)

  const [metricas, setMetricas] = useState({
    conversiones: "Cargando...", variacion_conversiones: "",
    cpl: "Cargando...", variacion_cpl: "",
    trafico: "Cargando...", variacion_trafico: ""
  })

  // DATOS SIMULADOS PARA LA GRÁFICA (Luego vendrán de Python)
  const datosGrafico = [
    { mes: 'Ene', conversiones: 400 },
    { mes: 'Feb', conversiones: 550 },
    { mes: 'Mar', conversiones: 480 },
    { mes: 'Abr', conversiones: 700 },
    { mes: 'May', conversiones: 850 },
    { mes: 'Jun', conversiones: 1100 },
    { mes: 'Jul', conversiones: 1850 },
  ];
const FormularioMetricas = ({ onActualizar }) => {
  const [form, setForm] = useState({ mes: '', conversiones: '', cpl: '', trafico: '' });

  const enviarDatos = async (e) => {
    e.preventDefault();
    await fetch('https://backend-saas-marketing.onrender.com/api/metricas-manual/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ mes: '', conversiones: '', cpl: '', trafico: '' });
    onActualizar(); // Esto recargará la gráfica automáticamente
  };

  return (
    <form onSubmit={enviarDatos} className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-2 gap-4">
      <input className="border p-2 rounded" placeholder="Mes (ej. Ago)" value={form.mes} onChange={e => setForm({...form, mes: e.target.value})} required />
      <input className="border p-2 rounded" type="number" placeholder="Conversiones" value={form.conversiones} onChange={e => setForm({...form, conversiones: e.target.value})} required />
      <input className="border p-2 rounded" type="number" step="0.01" placeholder="CPL ($)" value={form.cpl} onChange={e => setForm({...form, cpl: e.target.value})} required />
      <input className="border p-2 rounded" type="number" placeholder="Tráfico" value={form.trafico} onChange={e => setForm({...form, trafico: e.target.value})} required />
      <button className="col-span-2 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">Guardar Nueva Métrica</button>
    </form>
  );
};
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token')
    if (tokenGuardado) {
      setEstaAutenticado(true)
    }
  }, [])

  const obtenerDatosDelServidor = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('https://backend-saas-marketing.onrender.com/api/metricas-resumen/', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setMetricas(data)
      }
    } catch (error) {
      console.error("Error al traer los datos", error)
    }
  }

  useEffect(() => {
    if (estaAutenticado) {
      obtenerDatosDelServidor()
    }
  }, [estaAutenticado])

  const handleLogin = async (e) => {
    e.preventDefault()
    setMensaje({ texto: 'Verificando credenciales...', tipo: 'info' })

    try {
      const formData = new URLSearchParams()
      formData.append('username', email)
      formData.append('password', password)

      const response = await fetch('https://backend-saas-marketing.onrender.com/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.access_token)
        setEstaAutenticado(true)
      } else {
        setMensaje({ texto: 'Correo o contraseña incorrectos.', tipo: 'error' })
      }
    } catch (error) {
      setMensaje({ texto: 'No se pudo conectar con el servidor.', tipo: 'error' })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setEstaAutenticado(false)
    setEmail('')
    setPassword('')
    setMensaje({ texto: '', tipo: '' })
  }

if (estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-indigo-400">SaaS Analytics</h2>
          </div>
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <a href="#" className="block px-4 py-3 bg-indigo-600 rounded-lg text-white font-medium">Resumen</a>
            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition font-medium">
              Cerrar Sesión
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Resumen General</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h3 className="text-slate-500 font-semibold mb-1">Conversiones</h3>
               <p className="text-3xl font-bold text-slate-800">{metricas.conversiones}</p>
             </div>
             {/* ... repite para CPL y Tráfico ... */}
          </div>

          {/* AQUÍ LLAMAMOS AL NUEVO FORMULARIO */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Registrar Nueva Métrica</h3>
            <FormularioMetricas onActualizar={obtenerDatosDelServidor} />
          </section>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Crecimiento Real</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricas.grafico || []}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="conversiones" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    )
  }
  // ==========================================
  // PANTALLA 2: EL LOGIN 
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* ... (El mismo código del Login se mantiene igual) ... */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">SaaS Analytics</h2>
          <p className="text-slate-500 mt-2 text-sm">Ingresa a tu panel de control</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="admin@agenciademo.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition duration-200 shadow-md hover:shadow-lg">
            Iniciar Sesión
          </button>
        </form>

        {mensaje.texto && (
          <div className={`mt-6 p-4 rounded-lg text-sm text-center font-medium border ${mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700 border-green-200' : mensaje.tipo === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
            {mensaje.texto}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
