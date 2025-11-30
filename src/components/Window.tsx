import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { X, Minus, Square } from "lucide-react";
import { useDesktop } from "@/contexts/DesktopContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export const Window = ({ id, title, children, isMinimized, isMaximized, zIndex }: WindowProps) => {
  const { closeWindow, minimizeWindow, maximizeWindow, setActiveWindow, activeWindow } = useDesktop();
  const rndRef = useRef<Rnd>(null);
  const [snapZone, setSnapZone] = useState<"left" | "right" | "full" | null>(null);

  useEffect(() => {
    if (isMaximized && rndRef.current) {
      rndRef.current.updateSize({ width: "100%", height: "calc(100vh - 48px)" });
      rndRef.current.updatePosition({ x: 0, y: 0 });
    }
  }, [isMaximized]);

  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    const { x, y } = data;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - 48; // Subtract taskbar height
    const snapThreshold = 50;

    // Detect snap zones
    if (x < snapThreshold && y < snapThreshold) {
      setSnapZone("full");
    } else if (x < snapThreshold) {
      setSnapZone("left");
    } else if (x > screenWidth - snapThreshold) {
      setSnapZone("right");
    } else {
      setSnapZone(null);
    }
  };

  const handleDragStop = () => {
    if (!snapZone || !rndRef.current) {
      setSnapZone(null);
      return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - 48;

    switch (snapZone) {
      case "full":
        rndRef.current.updateSize({ width: screenWidth, height: screenHeight });
        rndRef.current.updatePosition({ x: 0, y: 0 });
        toast.success("Window maximized");
        break;
      case "left":
        rndRef.current.updateSize({ width: screenWidth / 2, height: screenHeight });
        rndRef.current.updatePosition({ x: 0, y: 0 });
        toast.success("Snapped to left");
        break;
      case "right":
        rndRef.current.updateSize({ width: screenWidth / 2, height: screenHeight });
        rndRef.current.updatePosition({ x: screenWidth / 2, y: 0 });
        toast.success("Snapped to right");
        break;
    }

    setSnapZone(null);
  };

  const isActive = activeWindow === id;

  if (isMinimized) return null;

  const defaultWidth = 800;
  const defaultHeight = 600;
  const centerX = (window.innerWidth - defaultWidth) / 2;
  const centerY = (window.innerHeight - 48 - defaultHeight) / 2;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.25,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ zIndex }}
      >
        <Rnd
          ref={rndRef}
          default={{
            x: centerX,
            y: centerY,
            width: defaultWidth,
            height: defaultHeight,
          }}
          minWidth={400}
          minHeight={300}
          bounds="parent"
          dragHandleClassName="window-drag-handle"
          onMouseDown={() => setActiveWindow(id)}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          disableDragging={isMaximized}
          enableResizing={!isMaximized}
          className={`window ${isActive ? "ring-2 ring-win-blue/50" : ""}`}
        >
          {/* Snap Zone Indicator */}
          {snapZone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="fixed inset-0 bg-win-blue pointer-events-none z-[9999]"
              style={{
                left: snapZone === "right" ? "50%" : 0,
                width: snapZone === "full" ? "100%" : "50%",
                height: "calc(100vh - 48px)",
                top: 0,
              }}
            />
          )}
          {/* Title Bar */}
          <div className="window-title-bar window-drag-handle flex items-center justify-between h-10 px-3 cursor-move select-none">
            <span className="text-sm font-medium text-text-primary">{title}</span>
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--muted))" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => minimizeWindow(id)}
                className="w-10 h-8 flex items-center justify-center rounded transition-colors"
                aria-label="Minimize"
              >
                <Minus className="w-4 h-4 text-text-secondary" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--muted))" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => maximizeWindow(id)}
                className="w-10 h-8 flex items-center justify-center rounded transition-colors"
                aria-label="Maximize"
              >
                <Square className="w-3 h-3 text-text-secondary" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "hsl(0, 84%, 60%)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => closeWindow(id)}
                className="w-10 h-8 flex items-center justify-center rounded hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Window Content */}
          <div className="h-[calc(100%-40px)] overflow-auto scrollbar-hide bg-window">
            {children}
          </div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
};
