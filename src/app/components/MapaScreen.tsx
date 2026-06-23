import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Bus, X, Clock, Navigation } from "lucide-react";

interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  horario: string;
  transporte: { tipo: string; lineas: string[] }[];
  coords: { x: number; y: number };
  color: string;
}

const sedes: Sede[] = [
  {
    id: 1,
    nombre: "Malvinas Argentinas",
    direccion: "Calle 50 entre 116 y 117",
    horario: "Almuerzo: 11:30–14:15 / Cena (vianda): 17:00–19:00",
    transporte: [
      { tipo: "Colectivo", lineas: ["520", "275", "506"] },
    ],
    coords: { x: 55, y: 58 },
    color: "#c8006a",
  },
  {
    id: 2,
    nombre: "Reforma Universitaria",
    direccion: "Calle 120 entre 61 y 62 N° 1439",
    horario: "Almuerzo: 11:30–14:15 / Cena (vianda): 17:00–19:00",
    transporte: [
      { tipo: "Colectivo", lineas: ["215", "520"] },
    ],
    coords: { x: 30, y: 42 },
    color: "#00897b",
  },
  {
    id: 3,
    nombre: "ATULP",
    direccion: "Avenida 44 N° 733 entre 9 y 10",
    horario: "Almuerzo: 11:30–14:15 / Cena (vianda): 17:00–19:00",
    transporte: [
      { tipo: "Colectivo", lineas: ["307", "360", "202"] },
      { tipo: "Tren", lineas: ["Roca – Est. La Plata"] },
    ],
    coords: { x: 48, y: 25 },
    color: "#c8006a",
  },
  {
    id: 4,
    nombre: "Club Everton",
    direccion: "Calle 14 entre 63 y 64",
    horario: "Almuerzo: 11:30–14:15 / Cena (vianda): 17:00–19:00",
    transporte: [
      { tipo: "Colectivo", lineas: ["275", "214", "202"] },
    ],
    coords: { x: 72, y: 35 },
    color: "#00897b",
  },
];

export function MapaScreen() {
  const [selected, setSelected] = useState<Sede | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-white pb-24 overflow-hidden">

      {/* Header */}
      <div className="px-5 pt-8 pb-4 bg-gradient-to-b from-[#c8006a]/8 to-transparent shrink-0">
        <div className="flex items-center gap-3">
          <MapPin size={26} color="#c8006a" />
          <div>
            <h2 className="text-[#1a0a14]" style={{ fontFamily: "'Playfair Display', serif" }}>Sedes del Comedor</h2>
            <p className="text-[#8a5a78] text-xs">{sedes.length} locales en La Plata</p>
          </div>
        </div>
      </div>

      {/* Mapa esquemático */}
      <div className="mx-5 rounded-2xl overflow-hidden border border-[#c8006a]/15 mb-4 shrink-0" style={{ height: 240 }}>
        <div className="relative w-full h-full bg-gradient-to-br from-[#e8f4f8] to-[#d4eaf0]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grilla de calles */}
            {[15,25,35,45,55,65,75,85].map(v => (
              <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} stroke="#b8ccd4" strokeWidth="0.4" />
            ))}
            {[10,20,30,40,50,60,70,80,90].map(v => (
              <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" stroke="#b8ccd4" strokeWidth="0.4" />
            ))}
            {/* Diagonales */}
            <line x1="0" y1="100" x2="100" y2="0" stroke="#a8c0ca" strokeWidth="0.8" />
            <line x1="50" y1="100" x2="100" y2="50" stroke="#a8c0ca" strokeWidth="0.6" />
            {/* Bosque */}
            <rect x="38" y="44" width="24" height="20" rx="4" fill="#a8c8a8" opacity="0.55" />
            <text x="50" y="56" textAnchor="middle" fontSize="3" fill="#3a6a3a">Bosque</text>
            {/* Plaza Moreno */}
            <rect x="46" y="22" width="8" height="6" rx="1" fill="#b0d4b0" opacity="0.7" />
            <text x="50" y="27" textAnchor="middle" fontSize="2.2" fill="#3a6a3a">Plaza</text>
          </svg>

          {/* Pines de sedes */}
          {sedes.map(sede => (
            <button
              key={sede.id}
              onClick={() => setSelected(sede)}
              className="absolute transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 active:scale-95"
              style={{ left: `${sede.coords.x}%`, top: `${sede.coords.y}%` }}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                style={{ backgroundColor: selected?.id === sede.id ? "#7a003f" : sede.color }}
              >
                <MapPin size={14} color="white" />
              </div>
            </button>
          ))}

          <div className="absolute bottom-2 right-2 bg-white/85 backdrop-blur-sm rounded-lg px-2 py-1">
            <p className="text-[#4a6a7a] text-[10px] font-medium">La Plata, Buenos Aires</p>
          </div>
        </div>
      </div>

      {/* Lista de sedes */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="flex flex-col gap-2">
          {sedes.map(sede => (
            <motion.button
              key={sede.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(sede)}
              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                selected?.id === sede.id
                  ? "border-[#c8006a]/40 bg-[#fde8f3]"
                  : "border-[#c8006a]/10 bg-white hover:border-[#c8006a]/25"
              }`}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: sede.color }}>
                <MapPin size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1a0a14]">{sede.nombre}</p>
                <p className="text-xs text-[#8a5a78] truncate">{sede.direccion}</p>
              </div>
              <div className="shrink-0 flex items-center gap-1">
                <Bus size={12} color="#8a5a78" />
                <span className="text-xs text-[#8a5a78]">{sede.transporte.reduce((n, t) => n + t.lineas.length, 0)}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Drawer de detalle */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full p-6 max-h-[75vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Título */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: selected.color }}>
                    <MapPin size={18} color="white" />
                  </div>
                  <div>
                    <h3 className="text-[#c8006a]" style={{ fontFamily: "'Playfair Display', serif" }}>{selected.nombre}</h3>
                    <p className="text-[#8a5a78] text-sm">{selected.direccion}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-[#fde8f3] flex items-center justify-center">
                  <X size={16} color="#c8006a" />
                </button>
              </div>

              {/* Horarios */}
              <div className="bg-[#fde8f3] rounded-xl px-4 py-3 mb-4">
                <div className="flex items-start gap-2">
                  <Clock size={14} color="#c8006a" className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-[#c8006a] font-medium mb-1">Horarios</p>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">☀️</span>
                        <p className="text-xs text-[#3a1a2a]"><span className="font-medium">Almuerzo:</span> 11:30 – 14:15 hs (turnos cada 45 min)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">🌙</span>
                        <p className="text-xs text-[#3a1a2a]"><span className="font-medium">Cena (vianda):</span> Retiro 17:00 – 19:00 hs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transporte */}
              <p className="text-xs uppercase tracking-wide text-[#8a5a78] mb-2 flex items-center gap-1.5">
                <Bus size={12} /> Transporte público
              </p>
              <div className="flex flex-col gap-3 mb-5">
                {selected.transporte.map((t, i) => (
                  <div key={i}>
                    <p className="text-sm text-[#3a1a2a] font-medium mb-1.5">{t.tipo}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.lineas.map(linea => (
                        <span key={linea} className="bg-[#c8006a] text-white text-xs px-2.5 py-1 rounded-full">{linea}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-[#c8006a] text-white py-3 rounded-xl font-medium hover:bg-[#a8005a] transition">
                <Navigation size={16} /> Cómo llegar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
