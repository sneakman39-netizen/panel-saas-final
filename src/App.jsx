import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// ==========================================
// 1. COMPONENTE DE TU PÁGINA WEB (LANDING)
// ==========================================
const LandingPage = ({ alIrALogin }) => {
  return (
    <div className="bg-gray-50 text-gray-600 antialiased font-sans">
      {/* Navbar principal */}
      <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 top-0 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <img src="https://weglobalconsulting.com/wp-content/uploads/2026/02/Logo_clean_website.png" alt="Global Consulting" className="h-14 md:h-20 w-auto" />
            </div>
            <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-gray-500">
              <a href="#inicio" className="hover:text-emerald-600 transition">Inicio</a>
              <a href="#servicios" className="hover:text-emerald-600 transition">Servicios</a>
              <a href="#nosotros" className="hover:text-emerald-600 transition">Nosotros</a>
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
                <button onClick={alIrALogin} className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition">
                  Acceso Clientes
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-900 relative overflow-hidden text-white px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <p className="text-emerald-400 text-sm font-bold mb-6 tracking-wide uppercase">
              Marketing Digital · Presencia Online · Análisis de Datos
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Impulsamos tu marca <br /> en el <span className="text-emerald-400">mundo digital</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Estrategias de marketing basadas en datos que transforman tu presencia online y generan resultados medibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-emerald-700 transition">
                Solicitar consulta gratuita
              </button>
              <button onClick={alIrALogin} className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
                Entrar a la Plataforma
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Soluciones integrales</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Combinamos creatividad, tecnología y análisis de datos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Marketing Digital</h3>
              <p>Campañas estratégicas para maximizar tu ROI.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Presencia Online</h3>
              <p>Diseño web y SEO de alto impacto.</p>
            </div>
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <span className="text-emerald-600 font-bold text-xs uppercase">Exclusivo</span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Análisis de Datos</h3>
              <p>Nuestra propia herramienta de análisis personalizada.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <p>© 2026 Global Consulting. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

// ==========================================
// 2. COMPONENTE PRINCIPAL (CONTROLADOR)
// ==========================================
export default function App() {
  const [vista, setVista] = useState('landing'); 
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [metricas, setMetricas] = useState({ conversiones: "0", cpl: "0", trafico: "0", grafico: [] });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setEstaAutenticado(true);
      setVista('dashboard');
    }
  }, []);

  const obtenerDatos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://backend-saas-marketing.onrender.com/api/metricas-resumen/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setMetricas(await res.json());
    } catch (e) { console.error(e); }
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
      alert("Credenciales incorrectas");
    }
  };

  // NAVEGACIÓN
  if (vista === 'landing') return <LandingPage alIrALogin={() => setVista('login')} />;

  if (vista === 'login' && !estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border">
          <button onClick={() => setVista('landing')} className="text-emerald-600 mb-6 flex items-center gap-2 font-medium">
            ← Volver a la web
          </button>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Acceso Clientes</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contraseña" required />
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition">
              Entrar al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-emerald-400 mb-8">Global Analytics</h2>
          <nav className="flex-1 space-y-2">
            <div className="px-4 py-3 bg-emerald-600 rounded-lg text-white">Panel de Control</div>
          </nav>
          <button onClick={() => { localStorage.clear(); setEstaAutenticado(false); setVista('landing'); }} className="mt-8 text-red-400 font-medium hover:text-red-300">
            Cerrar Sesión
          </button>
        </aside>
        <main className="flex-1 p-8">
           <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">Métricas de Marketing</h1>
           </header>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                <h3 className="text-slate-500 text-sm font-bold uppercase">Conversiones</h3>
                <p className="text-4xl font-bold text-emerald-600">{metricas.conversiones}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                <h3 className="text-slate-500 text-sm font-bold uppercase">CPL</h3>
                <p className="text-4xl font-bold text-emerald-600">{metricas.cpl}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
                <h3 className="text-slate-500 text-sm font-bold uppercase">Tráfico</h3>
                <p className="text-4xl font-bold text-emerald-600">{metricas.trafico}</p>
              </div>
           </div>

           {/* Gráfica */}
           <div className="bg-white p-6 rounded-xl border h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricas.grafico || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="conversiones" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </main>
      </div>
    );
  }

  return null;
}
