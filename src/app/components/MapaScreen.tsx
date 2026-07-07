import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Bus, X, Clock, Navigation, SunMedium, MoonStar } from "lucide-react";

interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  lat: number;
  lon: number;
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
    lat: -34.906884,
    lon: -57.941685,
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
    lat: -34.9094484,
    lon: -57.9256302,
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
    lat: -34.9130185,
    lon: -57.9582844,
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
    lat: -34.9303891,
    lon: -57.9446519,
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
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-white pb-4 sm:pb-6 overflow-hidden">
      <div className="flex w-full flex-col">

      {/* Encabezado */}
      <div className="px-4 pt-8 pb-4 sm:px-5 lg:px-6 bg-gradient-to-b from-[#c8006a]/8 to-transparent shrink-0">
        <div className="flex items-center gap-3">
          <MapPin size={26} color="#c8006a" />
          <div>
            <h2 className="text-[#1a0a14]" style={{ fontFamily: "'Open Sans', sans-serif" }}>Sedes del Comedor</h2>
            <p className="text-[#8a5a78] text-xs">{sedes.length} locales en La Plata</p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-5 lg:px-6">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Mapa interactivo tipo Google Maps */}
          <div className="mb-4 shrink-0 overflow-hidden rounded-[28px] border border-[#c8006a]/15 h-[260px] shadow-[0_18px_45px_rgba(200,0,106,0.08)] sm:h-[300px] lg:h-[400px]">
            <div className="relative h-full w-full bg-[#eef5f7]">
              <iframe
                key={selected?.id ?? "default"}
                title="Mapa de sedes del comedor"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={selected
                  ? `https://www.google.com/maps?q=${selected.lat},${selected.lon}&z=17&hl=es&output=embed`
                  : "https://www.google.com/maps?q=La+Plata,+Buenos+Aires&z=12&hl=es&output=embed"}
                allowFullScreen
              />

              <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-2xl border border-[#c8006a]/10 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
                <p className="text-[11px] font-semibold text-[#3a1a2a]">
                  {selected
                    ? `${selected.nombre} · ${selected.direccion}`
                    : "Seleccioná una sede para ver su ubicación exacta en La Plata"}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de sedes */}
          <div className="flex-1 overflow-y-auto pb-2 lg:pb-0">
        <div className="flex flex-col gap-2">
          {sedes.map(sede => (
            <motion.button
              key={sede.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (selected?.id !== sede.id) {
                  setSelected(sede);
                }
                setShowDetails(true);
              }}
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
        </div>
      </div>

      {/* Panel de detalle */}
      <AnimatePresence>
        {selected && showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowDetails(false)}
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
                    <h3 className="text-[#c8006a]" style={{ fontFamily: "'Open Sans', sans-serif" }}>{selected.nombre}</h3>
                    <p className="text-[#8a5a78] text-sm">{selected.direccion}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetails(false)} className="w-8 h-8 rounded-full bg-[#fde8f3] flex items-center justify-center">
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
                        <SunMedium size={13} className="text-[#c8006a]" />
                        <p className="text-xs text-[#3a1a2a]"><span className="font-medium">Almuerzo:</span> 11:30 – 14:15 hs (turnos cada 45 min)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MoonStar size={13} className="text-[#c8006a]" />
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


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}
