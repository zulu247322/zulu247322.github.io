import { UtensilsCrossed, Leaf, ShieldCheck, Ticket, Map, Home } from "lucide-react";

export type TabKey = "inicio" | "menu" | "vegano" | "sintagg" | "tickets" | "mapa";

const tabs: { key: TabKey; icon: React.FC<{ size?: number; color?: string }>; label: string }[] = [
  { key: "inicio", icon: Home, label: "Inicio" },
  { key: "menu", icon: UtensilsCrossed, label: "Menú" },
  

  { key: "tickets", icon: Ticket, label: "Tickets" },
  { key: "mapa", icon: Map, label: "Mapa" },
];

interface BottomNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="w-full shrink-0 bg-white border-t border-[#c8006a]/10 z-40 safe-bottom">
      <div className="flex max-w-6xl mx-auto">
        {tabs.map(tab => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? "bg-[#c8006a]" : "bg-transparent"}`}>
                <tab.icon size={17} color={isActive ? "#ffffff" : "#8a5a5a"} />
              </div>
              <span
                className="text-[9px] font-medium transition-colors"
                style={{ color: isActive ? "#c8006a" : "#8a5a5a" }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
