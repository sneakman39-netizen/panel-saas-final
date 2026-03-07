import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// 1. COMPONENTE DEL FORMULARIO
const FormularioMetricas = ({ onActualizar }) => {
  const [form, setForm] = useState({ mes: '', conversiones: '', cpl: '', trafico: '' });

  const enviarDatos = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-saas-marketing.onrender.com/api/metricas-manual/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setForm({ mes: '', conversiones: '', cpl: '', trafico: '' });
        onActualizar(); 
      }
    } catch (error) {
      console.error("Error al enviar datos", error);
    }
  };

  return (
    <form onSubmit={enviarDatos} className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input className="border p-2 rounded" placeholder="Mes (ej. Ago)" value={form.mes} onChange={e => setForm({...form, mes: e.target.value})} required />
      <input className="border p-2 rounded" type="number" placeholder="Conversiones" value={form.conversiones} onChange={e => setForm({...form, conversiones: e.target.value})} required />
      <input className="border p-2 rounded" type="number" step="0.01" placeholder="CPL ($)" value={form.cpl} onChange={e => setForm({...form, cpl: e.target.value})} required />
      <input className="border p-2 rounded" type="number" placeholder="Tráfico" value={form.trafico} onChange={e => setForm({...form, trafico: e.target.value})} required />
      <button className="md:col-span-4 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition font-bold">
        + Guardar Nueva Métrica
      </button>
    </form>
  );
};

// 2. COMPONENTE PRINCIPAL
function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
  const [estaAutenticado, setEstaAutenticado] = useState(false)
  const [metricas, setMetricas] = useState({
    conversiones: "0", cpl: "0", trafico: "0", grafico: []
  })

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
    setMensaje({ texto: 'Verificando...', tipo: 'info' })
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
        setMensaje({ texto: 'Error en credenciales', tipo: 'error' })
      }
    } catch (error) {
      setMensaje({ texto: 'Error de conexión', tipo: 'error' })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setEstaAutenticado(false)
  }

  if (estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-indigo-400">SaaS Analytics</h2>
          </div>
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <div className="px-4 py-3 bg-indigo-600 rounded-lg text-white font-medium">Resumen</div>
          </nav>
          <div className="p-4">
            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition">
              Cerrar Sesión
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Marketing</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-semibold">Conversiones</h3>
              <p className="text-3xl font-bold text-indigo-600">{metricas.conversiones}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-semibold">CPL</h3>
              <p className="text-3xl font-bold text-indigo-600">{metricas.cpl}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-semibold">Tráfico</h3>
              <p className="text-3xl font-bold text-indigo-600">{metricas.trafico}</p>
            </div>
          </div>

          <FormularioMetricas onActualizar={obtenerDatosDelServidor} />

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Crecimiento Histórico</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricas.grafico || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
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

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-8">SaaS Analytics</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg" placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg" placeholder="Contraseña" required />
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg">Entrar</button>
        </form>
        {mensaje.texto && <p className="mt-4 text-center text-red-500">{mensaje.texto}</p>}
      </div>
    </div>
  )
}

export default App
