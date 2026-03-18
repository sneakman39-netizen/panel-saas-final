import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// ==========================================
// 1. COMPONENTE DE TU PÁGINA WEB (LANDING)
// ==========================================
const LandingPage = ({ alIrALogin }) => {
  return (
    <div className="bg-gray-50 text-gray-600 antialiased font-sans">
      {/* Navbar de tu diseño original */}
      <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 top-0 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-20 items-center">
          <img src="https://weglobalconsulting.com/wp-content/uploads/2026/02/Logo_clean_website.png" alt="Logo" className="h-14 w-auto" />
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
            <a href="#servicios" className="hover:text-indigo-600 transition">Servicios</a>
            <a href="#nosotros" className="hover:text-indigo-600 transition">Nosotros</a>
            {/* BOTÓN DE ACCESO A LA HERRAMIENTA */}
            <button onClick={alIrALogin} className="bg-brand-dark text-white px-6 py-2 rounded-full bg-slate-900 hover:bg-slate-800 transition">
              Acceso Clientes
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section original */}
      <section className="pt-40 pb-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-emerald-400 text-sm font-bold mb-4">Marketing Digital · Analytics</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Impulsamos tu marca <br /> en el <span className="text-emerald-400">mundo digital</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-10">
            Estrategias basadas en datos que transforman tu presencia online.
          </p>
          <div className="flex gap-4">
            <a href="#contacto" className="bg-emerald-600 px-8 py-4 rounded-lg font-bold">Consultar Ahora</a>
            <button onClick={alIrALogin} className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold">Entrar a la Plataforma</button>
          </div>
        </div>
      </section>

      {/* Aquí podrías pegar el resto de tus secciones de Servicios, Nosotros, etc. */}
      <section id="servicios" className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Nuestros Servicios</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Combinamos creatividad y análisis de datos.</p>
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border">Análisis de Datos</div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border">Estrategia Digital</div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border">SEO & SEM</div>
        </div>
      </section>
      
      <footer className="py-12 bg-gray-100 text-center text-sm text-gray-500">
        © 2026 Global Consulting. Todos los derechos reservados.
      </footer>
    </div>
  );
};

// ==========================================
// 2. COMPONENTE PRINCIPAL (CONTROLADOR)
// ==========================================
export default function App() {
  const [vista, setVista] = useState('landing'); // 'landing', 'login', 'dashboard'
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [metricas, setMetricas] = useState({ conversiones: "0", cpl: "0", trafico: "0", grafico: [] });

  // Verificar si ya hay sesión al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setEstaAutenticado(true);
      setVista('dashboard');
    }
  }, []);

  const obtenerDatos = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('https://backend-saas-marketing.onrender.com/api/metricas-resumen/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) setMetricas(await res.json());
  };

  useEffect(() => {
    if (estaAutenticado) obtenerDatos();
  }, [estaAutenticado]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams({ username: email, password: password });
    const res = await fetch('https://backend-saas-marketing.onrender.com/login/', { method: 'POST', body: formData });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      setEstaAutenticado(true);
      setVista('dashboard');
    } else {
      alert("Error en credenciales");
    }
  };

  // RENDERIZADO CONDICIONAL
  if (vista === 'landing') {
    return <LandingPage alIrALogin={() => setVista('login')} />;
  }

  if (vista === 'login' && !estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <button onClick={() => setVista('landing')} className="text-sm text-indigo-600 mb-4 flex items-center gap-2">
            ← Volver a la web
          </button>
          <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Acceso Clientes</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg" placeholder="Contraseña" required />
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition">
              Entrar al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col">
          <h2 className="text-2xl font-bold text-indigo-400 mb-8">Global Analytics</h2>
          <nav className="flex-1 space-y-2">
            <div className="px-4 py-3 bg-indigo-600 rounded-lg">Panel de Control</div>
          </nav>
          <button onClick={() => { localStorage.clear(); setEstaAutenticado(false); setVista('landing'); }} className="text-red-400 font-medium">Cerrar Sesión</button>
        </aside>
        <main className="flex-1 p-8">
           <h1 className="text-3xl font-bold text-slate-800 mb-8">Métricas de Marketing</h1>
           {/* Aquí van tus gráficas y el formulario que ya teníamos */}
           <div className="bg-white p-6 rounded-xl border mb-8">
              <p className="text-slate-500">Conversiones: <strong>{metricas.conversiones}</strong></p>
           </div>
           {/* Gráfica de Recharts... */}
        </main>
      </div>
    );
  }

  return null;
}
