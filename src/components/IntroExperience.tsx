import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoAsset from "@/assets/tiba-logo.asset.json";

const KEY = "tiba_intro_seen_v1";

export function IntroExperience() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(KEY)) {
      setShow(true);
      const t = setTimeout(() => dismiss(), 4800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    try { window.localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#040820] text-white"
        >
          {/* Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/70"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>

          {/* Globe with orbits */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute"
          >
            <motion.svg
              width="520" height="520" viewBox="0 0 520 520"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="opacity-40"
            >
              <defs>
                <radialGradient id="g" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4DB7FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1D3D8F" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="260" cy="260" r="180" fill="url(#g)" />
              <circle cx="260" cy="260" r="180" stroke="#4DB7FF" strokeWidth="1" fill="none" opacity="0.5" />
              <ellipse cx="260" cy="260" rx="180" ry="70" stroke="#4DB7FF" strokeWidth="1" fill="none" opacity="0.4" />
              <ellipse cx="260" cy="260" rx="70" ry="180" stroke="#4DB7FF" strokeWidth="1" fill="none" opacity="0.4" />
              <ellipse cx="260" cy="260" rx="180" ry="120" stroke="#FFD400" strokeWidth="1" strokeDasharray="4 8" fill="none" opacity="0.5" transform="rotate(30 260 260)" />
            </motion.svg>
          </motion.div>

          {/* Logo & slogan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <motion.img
              src={logoAsset.url}
              alt="TIBA Viagens & Turismo"
              className="h-40 w-auto drop-shadow-[0_8px_30px_rgba(77,183,255,0.35)] sm:h-52"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="mt-6 max-w-xl text-base font-light tracking-wide text-white/90 sm:text-lg"
            >
              <span className="text-shine font-medium">Transformamos viagens em experiências inesquecíveis.</span>
            </motion.p>
          </motion.div>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={dismiss}
            className="absolute bottom-8 right-8 rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-widest text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            Saltar intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
