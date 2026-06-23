import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

type MenuType = "tradicional" | "vegetariano" | "sintagg";
type Shift = "almuerzo" | "cena";

interface DayMenu { almuerzo: string; cena: string }

// Cada array tiene 5 ítems → uno por día de la semana
const menuData: Record<MenuType, Record<string, DayMenu>> = {
  tradicional: {
    Lunes:     { almuerzo: "Fideos con salsa bolognesa",                      cena: "Salteado de verduras con arroz"          },
    Martes:    { almuerzo: "Medallón de pollo o pescado con ensalada",        cena: "Bondiola con ensalada rusa"              },
    Miércoles: { almuerzo: "Pollo al horno con ensalada",                     cena: "Tarta de verduras"                       },
    Jueves:    { almuerzo: "Arroz con pollo",                                 cena: "Medallón con puré mixto"                 },
    Viernes:   { almuerzo: "Pastel de papa",                                  cena: "Fideos con salsa verde"                  },
  },
  vegetariano: {
    Lunes:     { almuerzo: "Tallarines con salsa portuguesa",                 cena: "Potaje de lentejas"                                                      },
    Martes:    { almuerzo: "Milanesa de soja con ensalada de vegetales",      cena: "Ensalada de vegetales cocidos con huevos y porotos alubia a la provenzal" },
    Miércoles: { almuerzo: "Hamburguesa sin rebozar con ensalada de vegetales", cena: "Tarta de vegetales"                                                    },
    Jueves:    { almuerzo: "Risotto",                                         cena: "Medallón de garbanzo y vegetales con puré de vegetales"                   },
    Viernes:   { almuerzo: "Pastel de papa con soja texturizada",             cena: "Tallarines verdes con salsa de queso parmesano"                          },
  },
  sintagg: {
    Lunes:     { almuerzo: "Fideos sin TACC con queso y pan",                 cena: "Ensalada de pollo y arroz con vegetales" },
    Martes:    { almuerzo: "Milanesa de pollo con ensalada",                  cena: "Arroz amarillo con pollo"                },
    Miércoles: { almuerzo: "Cuarto de pollo con ensalada",                    cena: "Bondiola desmechada con ensalada"        },
    Jueves:    { almuerzo: "Milanesa de berenjena con papas",                 cena: "Pastel de papa"                          },
    Viernes:   { almuerzo: "Milanesa de pollo con puré",                      cena: "Fideos tirabuzón con salsa blanca"       },
  },
};

const menuTabs: { key: MenuType; label: string; emoji: string; color: string; bg: string; tag?: string }[] = [
  { key: "tradicional",  label: "Tradicional",  emoji: "🍽️", color: "#c8006a", bg: "#fde8f3" },
  { key: "vegetariano",  label: "Vegetariano",  emoji: "🥗", color: "#00897b", bg: "#e0f5f3", tag: "🌱 Vegetariano" },
  { key: "sintagg",      label: "Sin TACC",     emoji: "🌾", color: "#c8006a", bg: "#fde8f3", tag: "🌾 Apto Celíacos" },
];

const turnosAlmuerzo = ["11:30 – 12:15", "12:15 – 13:00", "13:00 – 13:45", "13:45 – 14:15"];

export function MenuScreen() {
  const [menuType, setMenuType]       = useState<MenuType>("tradicional");
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [shift, setShift]             = useState<Shift>("almuerzo");
  const [showTurnos, setShowTurnos]   = useState(false);

  const cfg     = menuTabs.find(t => t.key === menuType)!;
  const current = menuData[menuType][selectedDay];
  const plato   = shift === "almuerzo" ? current.almuerzo : current.cena;

  return (
    <div className="flex-1 overflow-y-auto bg-white pb-24">

      {/* Header */}
      <div className="px-5 pt-8 pb-4" style={{ background: `linear-gradient(to bottom, ${cfg.color}12, transparent)` }}>
        <h2 className="text-[#1a0a14]" style={{ fontFamily: "'Playfair Display', serif" }}>Menú semanal</h2>
        <p className="text-[#8a5a78] text-xs mt-0.5">Lunes a Viernes · $2.800 por comida</p>
      </div>

      {/* Tipo de menú */}
      <div className="px-5 mb-4">
        <div className="flex bg-[#f5e0ef] rounded-2xl p-1 gap-1">
          {menuTabs.map(t => (
            <button
              key={t.key}
              onClick={() => setMenuType(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                menuType === t.key ? "bg-white shadow text-[#1a0a14]" : "text-[#8a5a78]"
              }`}
            >
              <span className="text-base">{t.emoji}</span>
              <span className="text-xs">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Turno toggle */}
      <div className="px-5 mb-4">
        <div className="flex bg-[#f0f0f0] rounded-xl p-1">
          <button
            onClick={() => setShift("almuerzo")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
              shift === "almuerzo" ? "bg-white shadow text-[#c8006a]" : "text-[#8a5a78]"
            }`}
          >
            <Sun size={13} /> Almuerzo
          </button>
          <button
            onClick={() => setShift("cena")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
              shift === "cena" ? "bg-white shadow text-[#c8006a]" : "text-[#8a5a78]"
            }`}
          >
            <Moon size={13} /> Cena (vianda)
          </button>
        </div>

        {/* Info del turno */}
        {shift === "almuerzo" ? (
          <div className="mt-2">
            <button
              onClick={() => setShowTurnos(p => !p)}
              className="w-full flex items-center justify-between bg-[#fde8f3] rounded-xl px-4 py-2.5 text-left"
            >
              <div className="flex items-center gap-2">
                <Sun size={13} color="#c8006a" />
                <span className="text-xs text-[#c8006a] font-medium">Turnos: 11:30 – 14:15</span>
              </div>
              <span className="text-[#c8006a] text-xs">{showTurnos ? "▲" : "▼"} ver turnos</span>
            </button>
            {showTurnos && (
              <div className="bg-[#fde8f3] rounded-xl px-4 pb-3 -mt-1 pt-0">
                <div className="border-t border-[#c8006a]/10 pt-2 flex flex-wrap gap-2">
                  {turnosAlmuerzo.map(t => (
                    <span key={t} className="bg-white text-[#c8006a] text-xs px-3 py-1 rounded-full border border-[#c8006a]/20">{t}</span>
                  ))}
                </div>
                <p className="text-[#8a5a78] text-xs mt-2">Podés consumir en sede o retirar vianda.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2 bg-[#f5e0ef] rounded-xl px-4 py-2.5 flex items-center gap-2">
            <Moon size={13} color="#c8006a" />
            <div>
              <span className="text-xs text-[#c8006a] font-medium">Retiro: 17:00 – 19:00</span>
              <p className="text-[#8a5a78] text-[10px] mt-0.5">Modalidad exclusivamente vianda</p>
            </div>
          </div>
        )}
      </div>

      {/* Días */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                selectedDay === day
                  ? { backgroundColor: cfg.color, color: "#ffffff" }
                  : { backgroundColor: "#f0f0f0", color: "#8a5a78" }
              }
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Plato */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${menuType}-${selectedDay}-${shift}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
          >
            <div
              className="rounded-2xl p-5 mb-3 text-white"
              style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)` }}
            >
              <div className="flex items-center gap-2 mb-3 opacity-75">
                {shift === "almuerzo" ? <Sun size={13} /> : <Moon size={13} />}
                <span className="text-xs uppercase tracking-wider">
                  {shift === "almuerzo" ? "Almuerzo" : "Cena – Vianda"} · {selectedDay}
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Plato</p>
              <p className="text-lg font-semibold leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                {plato}
              </p>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                <span className="text-white/70 text-xs">Precio por comida</span>
                <span className="text-white font-semibold">$2.800</span>
              </div>
            </div>

            {cfg.tag && (
              <div className="flex gap-2 flex-wrap mb-3">
                <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: cfg.bg, color: cfg.color }}>
                  {cfg.tag}
                </span>
                {menuType === "sintagg" && (
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: cfg.bg, color: cfg.color }}>
                    Sin gluten
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Resumen semanal */}
        <div className="mt-4">
          <h3 className="text-[#1a0a14] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Toda la semana
          </h3>
          <div className="flex flex-col gap-2 pb-4">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all"
                style={
                  selectedDay === day
                    ? { borderColor: `${cfg.color}40`, background: cfg.bg }
                    : { borderColor: `${cfg.color}15`, background: "#ffffff" }
                }
              >
                <div
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold text-white"
                  style={{ backgroundColor: cfg.color, opacity: selectedDay === day ? 1 : 0.65 }}
                >
                  {day.slice(0, 2)}
                </div>
                <p className="text-sm font-medium text-[#1a0a14] truncate">
                  {shift === "almuerzo" ? menuData[menuType][day].almuerzo : menuData[menuType][day].cena}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
