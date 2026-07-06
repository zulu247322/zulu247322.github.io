import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoginScreen } from "./components/LoginScreen";
import { InicioScreen } from "./components/InicioScreen";
import { MenuScreen } from "./components/MenuScreen";
import { TicketsScreen } from "./components/TicketsScreen";
import { MapaScreen } from "./components/MapaScreen";
import { BottomNav, TabKey } from "./components/BottomNav";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { LogOut } from "lucide-react";
import logoImg from "./logo";

interface User {
  name: string;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("inicio");

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => { setUser(null); setActiveTab("inicio"); };
  const handleNavigate = (tab: string) => setActiveTab(tab as TabKey);

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f5f6]">
      <div className="flex flex-col h-screen w-full mx-auto bg-white overflow-hidden relative lg:max-w-none lg:rounded-none lg:shadow-none lg:border-0">
      {/* Top bar */}
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 lg:px-6 pt-4 pb-3 bg-white border-b border-[#6b1a1a]/10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#6b1a1a] flex items-center justify-center">
            <span className="text-white text-xs font-semibold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <p className="text-xs text-[#8a5a5a] leading-none">Hola,</p>
            <p className="text-sm font-medium text-[#1a0a0a] capitalize leading-tight">{user.name}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="bg-[#fdf0f0] rounded-xl px-2 py-1 flex items-center gap-1.5">
            <ImageWithFallback src={logoImg} alt="Logo UNLP" className="w-5 h-5 object-contain" />
            <span className="text-[#6b1a1a] text-xs font-medium">Comedor UNLP</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-8 h-8 rounded-xl bg-[#fdf0f0] flex items-center justify-center hover:bg-[#f5e8e8] transition"
          >
            <LogOut size={14} color="#6b1a1a" />
          </button>
        </div>
      </div>

      {/* Screen content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-hidden flex flex-col"
          >
            {activeTab === "inicio" && <InicioScreen userName={user.name} onNavigate={handleNavigate} />}
            {activeTab === "menu" && <MenuScreen type="regular" />}
            {activeTab === "vegano" && <MenuScreen type="vegano" />}
            {activeTab === "sintagg" && <MenuScreen type="sintagg" />}
            {activeTab === "tickets" && <TicketsScreen />}
            {activeTab === "mapa" && <MapaScreen />}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  </div>
  );
}
