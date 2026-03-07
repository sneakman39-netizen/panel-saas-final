import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// --- COMPONENTE DEL FORMULARIO ---
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
        alert("¡Métrica guardada!");
        onActualizar(); 
      }
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Registrar Nueva Métrica</h3>
      <form onSubmit={enviarDatos} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input className="border p-2 rounded" placeholder="Mes (ej. Ago)" value={form.mes} onChange={e => setForm({...form, mes: e.target.value})} required />
        <input className="border p-2 rounded" type="number" placeholder="Conversiones" value={form.conversiones} onChange={e => setForm({...form, conversiones: e.target.value})} required />
        <input className="border p-2 rounded" type="number" step="0.01" placeholder="CPL ($)" value={form.cpl} onChange={e => setForm({...form, cpl: e.target.value})} required />
        <input className="border p-2 rounded" type="number" placeholder="Tráfico" value={form.trafico} onChange={e => setForm({...form, trafico: e.target.value})} required />
        <button className="md:col-span-4 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition font-bold shadow-md">
          + Guardar Datos en PostgreSQL
        </button>
      </form>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [estaAutenticado, setEstaAutenticado] = useState(false)
  const [metricas, setMetricas] = useState({
    conversiones: "0",
    cpl: "0",
    trafico: "0",
    grafico: []
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setEstaAutenticado(true)
  }, [])

  const obtenerDatos = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('https://backend-saas-marketing.onrender.com/api/metricas-resumen/', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        // Si el backend manda un error porque no hay datos, evitamos que la app explote
        if (!data.error) {
          setMetricas(data)
        }
      }
    } catch (err) {
      console.error("Error de red:", err)
    }
  }

  useEffect(() => {
    if (estaAutenticado) obtenerDatos()
  }, [estaAutenticado])

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new URLSearchParams({ username: email, password: password })
    const res = await fetch('https://backend-saas-marketing.onrender.com/login/', {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('token', data.access_token)
      setEstaAutenticado(true)
    } else {
      alert("Credenciales incorrectas")
    }
  }

  if (estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-indigo-400 mb-8">SaaS Analytics</h2>
          <nav className="flex-1 space-y-2">
            <div className="px-4 py-3 bg-indigo-600 rounded-lg">Resumen Global</div>
          </nav>
          <button onClick={() => { localStorage.clear(); setEstaAutenticado(false); }} className="mt-8 text-red-400 hover:text-red-300 font-medium">
            Cerrar Sesión
          </button>
        </aside>

        {/* Contenido */}
        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center md:text-left">Dashboard de Marketing</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-semibold mb-1">Conversiones</h3>
              <p className="text-3xl font-bold text-indigo-600">{metricas.conversiones || "0"}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-semibold">Costo por Lead (CPL)</h3>
              <p className="text-3xl font-bold text-indigo-600">{metricas.cpl || "0"}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-semibold">Tráfico Total</h3>
              <p className="text-3xl font-bold text-indigo-600">{metricas.trafico || "0"}</p>
            </div>
          </div>

          <FormularioMetricas onActualizar={obtenerDatos} />

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Crecimiento Histórico de Campañas</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricas.grafico && metricas.grafico.length > 0 ? metricas.grafico : [{mes: 'Sin datos', conversiones: 0}]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="conversiones" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} strokeWidth={3} />
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Correo electrónico" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contraseña" required />
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-md">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
