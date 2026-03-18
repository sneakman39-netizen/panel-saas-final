import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// ==========================================
// 1. TRADUCCIONES (ES/EN)
// ==========================================
const translations = {
  es: {
    nav: { inicio: "Inicio", servicios: "Servicios", nosotros: "Nosotros", contacto: "Contacto", acceso: "Acceso Clientes", hablemos: "Hablemos" },
    hero: { tag: "Marketing Digital · Presencia Online · Análisis de Datos", title: "Impulsamos tu marca en el", span: "mundo digital", sub: "Estrategias basadas en datos que transforman tu presencia online y generan resultados medibles para tu negocio.", btn1: "Consulta Gratuita", btn2: "Nuestros Servicios" },
    why: { title: "¿Por Qué Escogernos?", sub1: "Estrategia con datos", desc1: "Decisiones basadas en investigación y análisis profundo.", sub2: "Equipo especializado", desc2: "Expertos en marketing, branding y automatización.", sub3: "Tecnología y CRM", desc3: "Implementamos embudos para captar y cerrar más leads." },
    services: { title: "Nuestros Servicios", s1: "Estrategia Integral", d1: "Análisis de mercado y consumidor para planes estructurados.", s2: "Branding Profesional", d2: "Identidad visual y manual de marca con enfoque premium.", s3: "Análisis de Datos", d3: "Nuestra propia herramienta exclusiva para medir tu ROI." }
  },
  en: {
    nav: { inicio: "Home", servicios: "Services", nosotros: "About Us", contacto: "Contact", acceso: "Client Access", hablemos: "Let's Talk" },
    hero: { tag: "Digital Marketing · Online Presence · Data Analytics", title: "We boost your brand in the", span: "digital world", sub: "Data-driven strategies that transform your online presence and generate measurable results for your business.", btn1: "Free Consultation", btn2: "Our Services" },
    why: { title: "Why Choose Us?", sub1: "Data Strategy", desc1: "Decisions based on deep research and analysis.", sub2: "Specialized Team", desc2: "Experts in marketing, branding, and automation.", sub3: "Tech & CRM", desc3: "We implement funnels to capture and close more leads." },
    services: { title: "Our Services", s1: "Integral Strategy", d1: "Market and consumer analysis for structured growth plans.", s2: "Professional Branding", d2: "Visual identity and brand manual with a premium focus.", s3: "Data Analytics", d3: "Our exclusive tool to measure your real ROI." }
  }
}

// ==========================================
// 2. COMPONENTE WEB PÚBLICA (LANDING)
// ==========================================
const LandingPage = ({ alIrALogin, lang, setLang }) => {
  const t = translations[lang];

  return (
    <div className="bg-gray-50 text-gray-800 antialiased font-sans">
      {/* Navbar con Selector de Idioma */}
      <nav className="bg-white/95 backdrop-blur-md fixed w-full z-50 top-0 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-20 items-center">
          <img src="https://weglobalconsulting.com/wp-content/uploads/2026/02/Logo_clean_website.png" alt="Logo" className="h-12 md:h-16 w-auto" />
          <div className="hidden md:flex space-x-6 items-center text-sm font-semibold">
            <a href="#inicio" className="hover:text-emerald-600 transition">{t.nav.inicio}</a>
            <a href="#servicios" className="hover:text-emerald-600 transition">{t.nav.servicios}</a>
            <a href="#nosotros" className="hover:text-emerald-600 transition">{t.nav.nosotros}</a>
            <div className="flex items-center space-x-2 border-l pl-4">
              <button onClick={() => setLang('es')} className={`px-1 ${lang === 'es' ? 'text-emerald-600 font-bold' : ''}`}>ES</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => setLang('en')} className={`px-1 ${lang === 'en' ? 'text-emerald-600 font-bold' : ''}`}>EN</button>
            </div>
            <button onClick={alIrALogin} className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition">{t.nav.acceso}</button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Basado en Global Consulting New Day) */}
      <section id="inicio" className="pt-40 pb-24 bg-[#112A28] text-white px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-emerald-400 text-sm font-bold mb-6 uppercase tracking-widest">{t.hero.tag}</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.hero.title} <br /> <span className="text-emerald-400">{t.hero.span}</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-10 leading-relaxed">{t.hero.sub}</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/19292245143" target="_blank" className="bg-emerald-600 px-8 py-4 rounded-lg font-bold hover:bg-emerald-700 transition">{t.hero.btn1}</a>
            <a href="#servicios" className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">{t.hero.btn2}</a>
          </div>
        </div>
        {/* Adorno visual (Círculo difuminado) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </section>

      {/* Sección: ¿Por qué escogernos? (Replicada) */}
      <section id="nosotros" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-16">{t.why.title}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl"><i className="fas fa-chart-line"></i></div>
              <h3 className="text-xl font-bold mb-3">{t.why.sub1}</h3>
              <p className="text-slate-500">{t.why.desc1}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl"><i className="fas fa-users"></i></div>
              <h3 className="text-xl font-bold mb-3">{t.why.sub2}</h3>
              <p className="text-slate-500">{t.why.desc2}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl"><i className="fas fa-microchip"></i></div>
              <h3 className="text-xl font-bold mb-3">{t.why.sub3}</h3>
              <p className="text-slate-500">{t.why.desc3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios (Con el estilo de Global Consulting) */}
      <section id="servicios" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16">{t.services.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition border border-gray-100 group">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{t.services[`s${num}`]}</h3>
                <p className="text-slate-500 mb-6">{t.services[`d${num}`]}</p>
                <a href="#contacto" className="text-emerald-600 font-bold group-hover:underline">Solicitar Servicio →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#112A28] text-slate-400 py-16 px-6 text-center border-t border-white/5">
        <p className="mb-4">© 2026 Global Consulting | Analytics & Growth. All rights reserved.</p>
        <div className="flex justify-center space-x-6 text-xl">
           <i className="fab fa-linkedin hover:text-white pointer"></i>
           <i className="fab fa-instagram hover:text-white pointer"></i>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// 3. COMPONENTE PRINCIPAL (CONTROLADOR)
// ==========================================
export default function App() {
  const [vista, setVista] = useState('landing'); 
  const [lang, setLang] = useState('es');
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

  if (vista === 'landing') return <LandingPage lang={lang} setLang={setLang} alIrALogin={() => setVista('login')} />;

  if (vista === 'login' && !estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <button onClick={() => setVista('landing')} className="text-emerald-600 mb-8 font-bold flex items-center gap-2">← Volver al sitio</button>
          <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Acceso Clientes</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Correo" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contraseña" required />
            <button type="submit" className="w-full bg-[#112A28] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition">Ingresar al Panel</button>
          </form>
        </div>
      </div>
    );
  }

  if (estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-[#112A28] text-white p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-emerald-400 mb-12">Global Analytics</h2>
          <nav className="flex-1 space-y-3">
            <div className="px-4 py-3 bg-emerald-600 rounded-xl font-bold">Resumen Real</div>
          </nav>
          <button onClick={() => { localStorage.clear(); setEstaAutenticado(false); setVista('landing'); }} className="mt-12 text-red-400 font-bold hover:text-red-300">Cerrar Sesión</button>
        </aside>
        <main className="flex-1 p-8 md:p-12">
           <h1 className="text-4xl font-bold text-slate-800 mb-10">Dashboard de Análisis</h1>
           <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Conversiones</h3>
                <p className="text-4xl font-bold text-emerald-600">{metricas.conversiones}</p>
              </div>
              {/* Tarjetas de CPL y Tráfico igual que la anterior... */}
           </div>
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricas.grafico || []}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="conversiones" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </main>
      </div>
    );
  }

  return null;
}
