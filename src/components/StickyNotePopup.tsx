import { useState, useEffect } from "react";
import { X, Pin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const StickyNotePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const hasSeenNote = sessionStorage.getItem("sticky-note-seen");
    if (!hasSeenNote) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (!isPinned) {
      sessionStorage.setItem("sticky-note-seen", "true");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed bottom-20 right-8 z-[10000] w-72"
        >
          <div className="bg-[#FFF740] text-black p-6 rounded-lg shadow-2xl rotate-2 hover:rotate-0 transition-transform">
            {/* Pin at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                onClick={() => setIsPinned(!isPinned)}
                className={`w-6 h-6 rounded-full shadow-md transition-colors ${
                  isPinned ? "bg-win-blue" : "bg-red-500"
                }`}
              >
                <Pin className={`w-3 h-3 text-white mx-auto ${isPinned ? "rotate-0" : "rotate-45"}`} />
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="mt-2 space-y-3 font-handwriting">
              <h3 className="text-xl font-bold">Welcome! 👋</h3>
              <p className="text-sm leading-relaxed">
                Thanks for visiting my interactive resume! Feel free to explore by clicking the desktop icons or using
                the Start menu.
              </p>
              <p className="text-xs opacity-70">
                Tip: Right-click the desktop for more options, or try opening File Explorer!
              </p>
            </div>

            {/* Paper lines effect */}
            <div className="mt-4 space-y-2 opacity-20">
              <div className="h-px bg-current" />
              <div className="h-px bg-current" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
