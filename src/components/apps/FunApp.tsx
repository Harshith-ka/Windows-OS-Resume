import { useState } from "react";
import { Smile, Code, Coffee, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const funContent = [
  {
    title: "My Debugging Process",
    icon: Code,
    content: "1. It works!\n2. Wait, why?\n3. Break everything\n4. Fix it again\n5. Repeat",
  },
  {
    title: "Coffee Status",
    icon: Coffee,
    content: "☕☕☕☕☕☕☕\n\nCurrent Level: MAXIMUM\nBugs Fixed: 127\nNew Bugs Created: 128",
  },
  {
    title: "Tech Stack Bingo",
    icon: Rocket,
    content: "React ✓  TypeScript ✓  Tailwind ✓\nNode.js ✓  MongoDB ✓  Docker ✓\n\nBINGO! 🎉\n\n(I promise I don't just throw buzzwords around)",
  },
  {
    title: "Honest Resume",
    icon: Smile,
    content: "Skills:\n• Writing code that works\n• Pretending to understand regex\n• Googling error messages\n• Stack Overflow level: Expert\n• Rubber duck debugging certified",
  },
];

export const FunApp = () => {
  const [selected, setSelected] = useState(0);
  const [konami, setKonami] = useState(false);

  const handleKonamiActivation = () => {
    setKonami(true);
    setTimeout(() => setKonami(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6 overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold text-white mb-2">🎮 Secret Fun Zone 🎮</h1>
        <p className="text-white/80">You found the Konami code! Here's the real me:</p>
      </motion.div>

      <div className="flex gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col gap-2 w-48">
          {funContent.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(idx)}
                className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                  selected === idx
                    ? "bg-white text-purple-600 shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium truncate">{item.title}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-6 overflow-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            {(() => {
              const Icon = funContent[selected].icon;
              return <Icon className="w-8 h-8 text-white" />;
            })()}
            <h2 className="text-2xl font-bold text-white">{funContent[selected].title}</h2>
          </div>
          <pre className="text-white text-lg font-mono whitespace-pre-wrap leading-relaxed">
            {funContent[selected].content}
          </pre>
        </motion.div>
      </div>

      {konami && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="text-6xl animate-bounce">🎉</div>
        </motion.div>
      )}
    </div>
  );
};
