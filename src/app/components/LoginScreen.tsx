import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, MailCheck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../logo";

type LoginMode = "login" | "register" | "recover";

interface LoginScreenProps {
  onLogin: (user: { name: string; email: string }) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [mode, setMode]               = useState<LoginMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [name, setName]               = useState("");
  const [dni, setDni]                 = useState("");
  const [recoverSent, setRecoverSent] = useState(false);
  const [error, setError]             = useState("");

  const handleLogin    = () => { if (!email || !password) { setError("Completá todos los campos."); return; } onLogin({ name: email.split("@")[0], email }); };
  const handleRegister = () => { if (!name || !email || !password || !dni) { setError("Completá todos los campos."); return; } onLogin({ name, email }); };
  const handleRecover  = () => { if (!email) { setError("Ingresá tu correo electrónico."); return; } setRecoverSent(true); setError(""); };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[#c8006a]/20 bg-white text-[#1a0a14] placeholder-[#8a5a78] focus:outline-none focus:ring-2 focus:ring-[#c8006a] transition";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#c8006a] to-[#7a003f] flex flex-col items-center justify-center px-4 sm:px-6">

      <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-xl overflow-hidden">
          <ImageWithFallback src={logoImg} alt="Logo Comedor UNLP" className="w-full h-full object-contain p-2" />
        </div>
        <h1 className="text-white text-2xl font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Comedor UNLP
        </h1>
        <p className="text-white/60 text-sm mt-1">Universidad Nacional de La Plata</p>
      </motion.div>

      <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 sm:p-6">
        {mode !== "login" && (
          <button onClick={() => { setMode("login"); setError(""); setRecoverSent(false); }} className="flex items-center gap-1 text-[#c8006a] mb-4 hover:opacity-70 transition">
            <ArrowLeft size={16} /><span className="text-sm">Volver</span>
          </button>
        )}

        <h2 className="text-[#c8006a] mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          {mode === "login" && "Iniciar sesión"}
          {mode === "register" && "Crear cuenta"}
          {mode === "recover" && "Recuperar contraseña"}
        </h2>

        {mode === "recover" && recoverSent ? (
          <div className="text-center py-4">
            <div className="mb-3 flex justify-center text-[#c8006a]"><MailCheck size={32} /></div>
            <p className="text-[#c8006a] font-medium">¡Correo enviado!</p>
            <p className="text-[#8a5a78] text-sm mt-1">Revisá tu bandeja de entrada para restablecer tu contraseña.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mode === "register" && (
              <>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a5a78]" />
                  <input className={inputClass + " pl-9"} placeholder="Nombre y apellido" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a5a78]" />
                  <input className={inputClass + " pl-9"} placeholder="DNI" value={dni} onChange={e => setDni(e.target.value)} type="number" />
                </div>
              </>
            )}

            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a5a78]" />
              <input className={inputClass + " pl-9"} placeholder="Correo electrónico" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} type="email" />
            </div>

            {mode !== "recover" && (
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a5a78]" />
                <input
                  className={inputClass + " pl-9 pr-10"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  type={showPassword ? "text" : "password"}
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a5a78] hover:text-[#c8006a] transition">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              onClick={mode === "login" ? handleLogin : mode === "register" ? handleRegister : handleRecover}
              className="w-full py-3 bg-[#c8006a] text-white rounded-xl hover:bg-[#a8005a] active:scale-95 transition font-medium"
            >
              {mode === "login" && "Ingresar"}
              {mode === "register" && "Registrarme"}
              {mode === "recover" && "Enviar enlace"}
            </button>

            {mode === "login" && (
              <>
                <button onClick={() => { setMode("recover"); setError(""); }} className="text-[#c8006a] text-sm text-center hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
                <div className="border-t border-[#c8006a]/10 pt-3">
                  <p className="text-center text-sm text-[#8a5a78]">
                    ¿No tenés cuenta?{" "}
                    <button onClick={() => { setMode("register"); setError(""); }} className="text-[#c8006a] font-medium hover:underline">Registrate</button>
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </motion.div>

      <p className="text-white/30 text-xs mt-8">UNLP · Dirección de Bienestar Universitario</p>
    </div>
  );
}
