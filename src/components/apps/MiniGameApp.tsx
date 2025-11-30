import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const techLogos = [
  { name: "React", emoji: "⚛️", category: "Frontend" },
  { name: "Node.js", emoji: "🟢", category: "Backend" },
  { name: "TypeScript", emoji: "🔷", category: "Language" },
  { name: "MongoDB", emoji: "🍃", category: "Database" },
  { name: "Docker", emoji: "🐳", category: "DevOps" },
  { name: "Git", emoji: "🔀", category: "Tools" },
  { name: "Python", emoji: "🐍", category: "Language" },
  { name: "PostgreSQL", emoji: "🐘", category: "Database" },
];

type GameMode = "menu" | "typing" | "matching";

export const MiniGameApp = () => {
  const [gameMode, setGameMode] = useState<GameMode>("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("game-high-score") || "0");
  });

  // Typing Challenge State
  const [typingText, setTypingText] = useState("");
  const [typingInput, setTypingInput] = useState("");
  const [typingTime, setTypingTime] = useState(30);
  const [typingActive, setTypingActive] = useState(false);

  // Matching Game State
  const [matchingCards, setMatchingCards] = useState<typeof techLogos>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  const typingPhrases = [
    "const developer = 'awesome';",
    "npm install happiness",
    "git commit -m 'Fixed bug'",
    "async function dream() {}",
    "import React from 'react';",
  ];

  useEffect(() => {
    if (typingActive && typingTime > 0) {
      const timer = setTimeout(() => setTypingTime(typingTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (typingTime === 0) {
      endTypingGame();
    }
  }, [typingActive, typingTime]);

  const startTypingGame = () => {
    setGameMode("typing");
    setTypingText(typingPhrases[Math.floor(Math.random() * typingPhrases.length)]);
    setTypingInput("");
    setTypingTime(30);
    setTypingActive(true);
    setScore(0);
  };

  const endTypingGame = () => {
    setTypingActive(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("game-high-score", score.toString());
      toast.success("New High Score! 🎉");
    }
  };

  const handleTypingInput = (value: string) => {
    setTypingInput(value);
    if (value === typingText) {
      setScore(score + 1);
      setTypingText(typingPhrases[Math.floor(Math.random() * typingPhrases.length)]);
      setTypingInput("");
      toast.success("+1 Point!");
    }
  };

  const startMatchingGame = () => {
    setGameMode("matching");
    const shuffled = [...techLogos, ...techLogos]
      .sort(() => Math.random() - 0.5)
      .map((tech, idx) => ({ ...tech, id: idx }));
    setMatchingCards(shuffled as any);
    setSelectedCard(null);
    setMatchedCards([]);
    setScore(0);
  };

  const handleCardClick = (index: number) => {
    if (matchedCards.includes(index) || selectedCard === index) return;

    if (selectedCard === null) {
      setSelectedCard(index);
    } else {
      const firstCard = matchingCards[selectedCard];
      const secondCard = matchingCards[index];

      if (firstCard.name === secondCard.name) {
        setMatchedCards([...matchedCards, selectedCard, index]);
        setScore(score + 10);
        toast.success("Match! +10 points");
        
        if (matchedCards.length + 2 === matchingCards.length) {
          setTimeout(() => {
            toast.success("You won! 🎉");
            if (score + 10 > highScore) {
              setHighScore(score + 10);
              localStorage.setItem("game-high-score", (score + 10).toString());
            }
          }, 500);
        }
      }
      setSelectedCard(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 overflow-auto">
      {gameMode === "menu" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-full gap-6"
        >
          <Trophy className="w-20 h-20 text-yellow-300" />
          <h1 className="text-4xl font-bold text-white mb-2">Secret Mini-Games</h1>
          <p className="text-white/80 mb-4">High Score: {highScore}</p>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startTypingGame}
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold shadow-lg"
            >
              ⌨️ Typing Challenge
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startMatchingGame}
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold shadow-lg"
            >
              🎯 Tech Stack Matching
            </motion.button>
          </div>
        </motion.div>
      )}

      {gameMode === "typing" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-white">
              <div className="text-3xl font-bold">⏱️ {typingTime}s</div>
              <div className="text-xl">Score: {score}</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode("menu")}
              className="px-4 py-2 bg-white/20 text-white rounded-lg"
            >
              Back to Menu
            </motion.button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <div className="text-4xl font-mono text-white bg-black/30 p-6 rounded-lg">
              {typingText}
            </div>

            <input
              type="text"
              value={typingInput}
              onChange={(e) => handleTypingInput(e.target.value)}
              className="w-full max-w-2xl px-6 py-4 text-2xl font-mono rounded-lg border-4 border-white/50 focus:border-white outline-none"
              placeholder="Type here..."
              disabled={!typingActive}
              autoFocus
            />

            {!typingActive && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={startTypingGame}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Play Again
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {gameMode === "matching" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-white text-2xl font-bold">Score: {score}</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode("menu")}
              className="px-4 py-2 bg-white/20 text-white rounded-lg"
            >
              Back to Menu
            </motion.button>
          </div>

          <div className="grid grid-cols-4 gap-4 flex-1">
            {matchingCards.map((card: any, idx: number) => (
              <motion.button
                key={idx}
                whileHover={{ scale: matchedCards.includes(idx) ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(idx)}
                className={`aspect-square rounded-lg flex items-center justify-center text-6xl transition-all ${
                  matchedCards.includes(idx)
                    ? "bg-green-500/30 cursor-default"
                    : selectedCard === idx
                    ? "bg-white"
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                {(selectedCard === idx || matchedCards.includes(idx)) && card.emoji}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
