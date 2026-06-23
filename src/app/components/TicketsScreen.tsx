import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, QrCode, X, Ticket, CheckCircle } from "lucide-react";

const DAYS = ["Lunes 9", "Martes 10", "Miércoles 11", "Jueves 12", "Viernes 13"];

type Shift = "mediodia" | "noche";

interface TicketItem {
  day: string;
  shift: Shift;
}

const initialTickets: TicketItem[] = [
  { day: "Lunes 9", shift: "mediodia" },
  { day: "Martes 10", shift: "noche" },
  { day: "Miércoles 11", shift: "mediodia" },
];

export function TicketsScreen() {
  const [myTickets, setMyTickets] = useState<TicketItem[]>(initialTickets);
  const [cart, setCart] = useState<TicketItem[]>([]);
  const [showQR, setShowQR] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const addToCart = (day: string, shift: Shift) => {
    const exists = cart.some(t => t.day === day && t.shift === shift);
    const alreadyOwned = myTickets.some(t => t.day === day && t.shift === shift);
    if (!exists && !alreadyOwned) {
      setCart(prev => [...prev, { day, shift }]);
    }
  };

  const removeFromCart = (day: string, shift: Shift) => {
    setCart(prev => prev.filter(t => !(t.day === day && t.shift === shift)));
  };

  const inCart = (day: string, shift: Shift) => cart.some(t => t.day === day && t.shift === shift);
  const owned = (day: string, shift: Shift) => myTickets.some(t => t.day === day && t.shift === shift);

  const handlePurchase = () => {
    setMyTickets(prev => [...prev, ...cart]);
    setCart([]);
    setPurchased(true);
    setShowQR(false);
    setTimeout(() => setPurchased(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white pb-32">
      {/* Header */}
      <div className="px-5 pt-8 pb-5 bg-gradient-to-b from-[#6b1a1a]/8 to-transparent">
        <div className="flex items-center gap-3">
          <Ticket size={26} color="#6b1a1a" />
          <h2 className="text-[#1a0a0a]" style={{ fontFamily: "'Playfair Display', serif" }}>Mis Tickets</h2>
        </div>
        <p className="text-[#8a5a5a] text-sm mt-1">Semana del 9 al 13 de junio</p>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {purchased && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-5 mb-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <CheckCircle size={18} className="text-green-600 shrink-0" />
            <p className="text-green-700 text-sm font-medium">¡Tickets comprados exitosamente!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My tickets */}
      <div className="px-5 mb-6">
        <h3 className="text-[#6b1a1a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Tickets disponibles</h3>
        {myTickets.length === 0 ? (
          <div className="text-center py-8 text-[#8a5a5a]">
            <Ticket size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No tenés tickets aún</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {myTickets.map((t, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#fdf0f0] border border-[#6b1a1a]/15 rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#6b1a1a] flex items-center justify-center">
                  <Ticket size={18} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1a0a0a]">{t.day}</p>
                  <p className="text-xs text-[#8a5a5a]">{t.shift === "mediodia" ? "☀️ Mediodía · 11:30 – 14:30" : "🌙 Noche · 18:30 – 21:00"}</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Válido</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buy tickets section */}
      <div className="px-5">
        <h3 className="text-[#6b1a1a] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Comprar tickets</h3>
        <div className="flex flex-col gap-3">
          {DAYS.map(day => (
            <div key={day} className="bg-white border border-[#6b1a1a]/10 rounded-2xl p-4">
              <p className="font-medium text-[#1a0a0a] mb-3">{day} de junio</p>
              <div className="grid grid-cols-2 gap-2">
                {(["mediodia", "noche"] as Shift[]).map(shift => {
                  const isOwned = owned(day, shift);
                  const isInCart = inCart(day, shift);
                  return (
                    <button
                      key={shift}
                      disabled={isOwned}
                      onClick={() => isInCart ? removeFromCart(day, shift) : addToCart(day, shift)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        isOwned
                          ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                          : isInCart
                          ? "bg-[#6b1a1a] border-[#6b1a1a] text-white"
                          : "bg-white border-[#6b1a1a]/20 text-[#6b1a1a] hover:border-[#6b1a1a]/50"
                      }`}
                    >
                      {isOwned ? (
                        <CheckCircle size={14} />
                      ) : isInCart ? (
                        <Minus size={14} />
                      ) : (
                        <Plus size={14} />
                      )}
                      {shift === "mediodia" ? "Mediodía" : "Noche"}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-20 left-0 right-0 px-5"
          >
            <div className="bg-[#6b1a1a] rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="flex-1">
                <p className="text-white font-medium">{cart.length} ticket{cart.length > 1 ? "s" : ""} seleccionado{cart.length > 1 ? "s" : ""}</p>
                <p className="text-white/60 text-xs">Tap en "Pagar con QR" para continuar</p>
              </div>
              <button
                onClick={() => setShowQR(true)}
                className="flex items-center gap-2 bg-white text-[#6b1a1a] px-4 py-2 rounded-xl font-medium text-sm hover:bg-[#f5e8e8] transition"
              >
                <QrCode size={16} />
                Seleccionar método de pago
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-t-3xl w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#6b1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Elegí tu pago</h3>
                <button onClick={() => setShowQR(false)} className="w-8 h-8 rounded-full bg-[#f5e8e8] flex items-center justify-center">
                  <X size={16} color="#6b1a1a" />
                </button>
              </div>

              {/* Tickets summary */}
              <div className="bg-[#fdf0f0] rounded-xl p-3 mb-5">
                <p className="text-[#6b1a1a] text-xs font-medium mb-2">Tickets a adquirir:</p>
                {cart.map((t, i) => (
                  <p key={i} className="text-[#4a2a2a] text-sm">
                    · {t.day} · {t.shift === "mediodia" ? "Mediodía" : "Noche"}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-3 mb-5">
                <button
                  onClick={handlePurchase}
                  className="w-full bg-[#ffce00] text-[#1f1f1f] py-3.5 rounded-xl font-medium hover:bg-[#ffd83f] transition active:scale-95"
                >
                  Pagar con Mercado Pago
                </button>
                <button
                  onClick={handlePurchase}
                  className="w-full bg-[#3a8dff] text-white py-3.5 rounded-xl font-medium hover:bg-[#5ea0ff] transition active:scale-95"
                >
                  Pagar con Cuenta DNI
                </button>
              </div>

              <p className="text-[#8a5a5a] text-xs text-center">Al seleccionar un método, se completará la compra y recibirás el ticket.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
