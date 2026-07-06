import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, X, Ticket, CheckCircle, SunMedium, MoonStar } from "lucide-react";

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
    setCart(prev => {
      const nextCart = prev.filter(t => !(t.day === day && t.shift === shift));
      if (nextCart.length === 0) {
        setShowQR(false);
      }
      return nextCart;
    });
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
    <div className="flex-1 overflow-y-auto bg-white pb-4 sm:pb-6">
      <div className="flex w-full flex-col">
      {/* Header */}
      <div className="px-4 pt-8 pb-5 sm:px-5 lg:px-6 bg-gradient-to-b from-[#c8006a]/15 to-transparent">
        <div className="flex items-center gap-3">
          <Ticket size={26} color="#c8006a" />
          <h2 className="text-[#c8006a]" style={{ fontFamily: "'Open Sans', sans-serif" }}>Mis Tickets</h2>
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
            className="mx-5 mb-4 bg-[#fdf0f0] border border-[#c8006a]/20 rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <CheckCircle size={18} className="text-[#c8006a] shrink-0" />
            <p className="text-[#6b1a1a] text-sm font-medium">¡Tickets comprados exitosamente!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My tickets */}
      <div className="px-4 mb-6 sm:px-5 lg:px-6">
        <h3 className="text-[#c8006a] mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>Tickets disponibles</h3>
        {myTickets.length === 0 ? (
          <div className="text-center py-8 text-[#8a5a5a]">
            <Ticket size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No tenés tickets aún</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {myTickets.map((t, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#fff0f6] border border-[#c8006a]/15 rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#c8006a] flex items-center justify-center">
                  <Ticket size={18} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1a0a0a]">{t.day}</p>
                  <p className="text-xs text-[#8a5a5a] flex items-center gap-1.5">{t.shift === "mediodia" ? <><SunMedium size={12} /> Mediodía · 11:30 – 14:30</> : <><MoonStar size={12} /> Noche · 18:30 – 21:00</>}</p>
                </div>
                <span className="bg-[#fde8f3] text-[#c8006a] text-xs px-2 py-0.5 rounded-full">Válido</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buy tickets section */}
      <div className="px-4 sm:px-5 lg:px-6">
        <h3 className="text-[#6b1a1a] mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>Comprar tickets</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {DAYS.map(day => (
            <div key={day} className="bg-white border border-[#c8006a]/15 rounded-2xl p-4 h-full">
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
                          ? "bg-[#c8006a] border-[#c8006a] text-white"
                          : "bg-white border-[#c8006a]/20 text-[#c8006a] hover:border-[#c8006a]/50"
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
            <div className="bg-[#c8006a] border border-[#c8006a]/80 rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="flex-1">
                <p className="text-white font-medium">{cart.length} ticket{cart.length > 1 ? "s" : ""} seleccionado{cart.length > 1 ? "s" : ""}</p>
                <p className="text-white text-xs">Tap en "Seleccionar método de pago" para continuar</p>
              </div>
              <button
                onClick={() => setShowQR(true)}
                className="bg-white text-[#6b1a1a] px-4 py-2 rounded-xl font-medium text-sm hover:bg-[#f5e8e8] transition"
              >
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
              className="bg-[#fff0f6] rounded-t-3xl w-full max-w-md p-6 border border-[#c8006a]/20 shadow-[0_-16px_40px_rgba(200,0,106,0.12)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#c8006a]" style={{ fontFamily: "'Open Sans', sans-serif" }}>Elegí tu pago</h3>
                <button onClick={() => setShowQR(false)} className="w-8 h-8 rounded-full bg-[#f5e8f6] flex items-center justify-center">
                  <X size={16} color="#c8006a" />
                </button>
              </div>

              {/* Tickets summary */}
              <div className="bg-white rounded-xl p-3 mb-5 border border-[#c8006a]/15">
                <p className="text-[#6b1a1a] text-xs font-medium mb-2">Tickets a adquirir:</p>
                <div className="flex flex-col gap-2">
                  {cart.map(t => (
                    <div key={`${t.day}-${t.shift}`} className="flex items-center justify-between gap-2 rounded-lg bg-[#fff5f9] px-3 py-2">
                      <p className="text-[#4a2a2a] text-sm">
                        · {t.day} · {t.shift === "mediodia" ? "Mediodía" : "Noche"}
                      </p>
                      <button
                        onClick={() => removeFromCart(t.day, t.shift)}
                        className="w-7 h-7 rounded-full bg-[#f5e8f6] flex items-center justify-center shrink-0"
                        aria-label={`Quitar ${t.day} ${t.shift === "mediodia" ? "Mediodía" : "Noche"}`}
                      >
                        <X size={14} color="#c8006a" />
                      </button>
                    </div>
                  ))}
                </div>
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
  </div>
  );
}
