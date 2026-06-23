import { motion } from "motion/react";
import { UtensilsCrossed, Ticket, Map } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../logo";

interface InicioScreenProps {
  userName: string;
  onNavigate: (tab: string) => void;
}

const quickLinks = [
  { key: "menu",    icon: UtensilsCrossed, label: "Menú",    color: "#c8006a", bg: "#fde8f3" },
  { key: "tickets", icon: Ticket,          label: "Tickets", color: "#00897b", bg: "#e0f5f3" },
  { key: "mapa",    icon: Map,             label: "Mapa",    color: "#c8006a", bg: "#fde8f3" },
];

export function InicioScreen({ userName, onNavigate }: InicioScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white pb-24">

      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#c8006a] to-[#9a0052] px-6 pt-12 pb-16">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-white/60 text-sm">Bienvenido/a,</p>
          <h1 className="text-white text-2xl capitalize mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
            {userName} 👋
          </h1>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-8">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* About card */}
      <div className="px-5 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md border border-[#c8006a]/10 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#c8006a]/15 flex items-center justify-center overflow-hidden shadow-sm">
              <ImageWithFallback src={logoImg} alt="Logo Comedor UNLP" className="w-full h-full object-contain p-1" />
            </div>
            <h2 className="text-[#c8006a]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Comedor Universitario UNLP
            </h2>
          </div>
          <p className="text-[#3a1a2a] text-sm leading-relaxed">
            El Comedor Universitario de la Universidad Nacional de La Plata brinda alimentación accesible a toda la comunidad universitaria. Contamos con menú tradicional, vegetariano y sin TACC en 4 sedes de la ciudad.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#c8006a]/10">
            {[
              { value: "4",      label: "Sedes"             },
              { value: "$2.800", label: "Por comida"        },
              { value: "3",      label: "Tipos de menú"     },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-[#c8006a] font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p className="text-[#8a5a78] text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Aviso */}
      <div className="px-5 mt-4">
        <div className="bg-[#fffbe6] border border-yellow-300 rounded-xl px-4 py-3 flex gap-3 items-start">
          <span className="text-lg">📢</span>
          <div>
            <p className="text-yellow-800 text-sm font-medium">Aviso importante</p>
            <p className="text-yellow-700 text-xs mt-0.5">El comedor estará cerrado el jueves 19 de junio por feriado nacional. Planificá tu semana con anticipación.</p>
          </div>
        </div>
      </div>

      {/* Acceso rápido */}
      <div className="px-5 mt-6">
        <h3 className="text-[#c8006a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Acceso rápido</h3>
        <div className="grid grid-cols-3 gap-3">
          {quickLinks.map((link, i) => (
            <motion.button
              key={link.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
              onClick={() => onNavigate(link.key)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:scale-105 active:scale-95 transition-transform"
              style={{ background: link.bg }}
            >
              <link.icon size={24} color={link.color} />
              <span className="text-xs font-medium" style={{ color: link.color }}>{link.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menú de hoy */}
      <div className="px-5 mt-6">
        <h3 className="text-[#c8006a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Menú de hoy</h3>
        <div className="bg-gradient-to-br from-[#c8006a] to-[#9a0052] rounded-2xl p-5 text-white">
          <p className="text-white/70 text-xs uppercase tracking-wide mb-2">Lunes · Tradicional</p>
          <p className="font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Fideos con salsa bolognesa
          </p>
          <p className="text-white/60 text-xs mt-1">☀️ Almuerzo · Turnos 11:30 – 14:15</p>
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-white/70 text-xs uppercase tracking-wide mb-1.5">Cena (vianda)</p>
            <p className="font-medium">Salteado de verduras con arroz</p>
            <p className="text-white/60 text-xs mt-0.5">🌙 Retiro: 17:00 – 19:00</p>
          </div>
        </div>
      </div>

      {/* Horarios */}
      <div className="px-5 mt-4 mb-6">
        <div className="bg-[#fff8fc] border border-[#c8006a]/15 rounded-2xl p-5">
          <h3 className="text-[#c8006a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Horarios</h3>

          {/* Almuerzo */}
          <div className="bg-white rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">☀️</span>
              <p className="text-[#c8006a] font-semibold text-sm">Almuerzo</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["11:30 – 12:15", "12:15 – 13:00", "13:00 – 13:45", "13:45 – 14:15"].map(t => (
                <span key={t} className="bg-[#fde8f3] text-[#c8006a] text-xs px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
            <p className="text-[#8a5a78] text-xs mt-2">Consumo en sede o retiro de vianda</p>
          </div>

          {/* Cena */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🌙</span>
              <p className="text-[#c8006a] font-semibold text-sm">Cena</p>
            </div>
            <p className="text-[#c8006a] text-sm font-medium">Retiro: 17:00 – 19:00</p>
            <p className="text-[#8a5a78] text-xs mt-1">Modalidad exclusivamente vianda</p>
          </div>

          <p className="text-[#8a5a78] text-xs mt-3 text-center">Lunes a viernes · Excepto feriados</p>
        </div>
      </div>
    </div>
  );
}
