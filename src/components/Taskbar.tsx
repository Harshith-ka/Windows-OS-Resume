import { useState, useEffect } from "react";
import { useDesktop } from "@/contexts/DesktopContext";
import { desktopIcons } from "@/lib/resumeData";
import { Sun, Moon, Search, Wifi, Volume2, Battery, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { StartMenu } from "./StartMenu";

export const Taskbar = () => {
  const { windows, restoreWindow, theme, toggleTheme, openWindow } = useDesktop();
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [showSystemTray, setShowSystemTray] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      
      <div className="taskbar fixed bottom-0 left-0 right-0 h-12 flex items-center justify-center px-2 z-[9999]">
        {/* Center: Start Button + Pinned Apps + Open Windows */}
        <div className="flex items-center gap-1">
          {/* Windows Start Button */}
          <motion.button
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isStartMenuOpen ? "bg-muted" : "hover:bg-muted/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Start"
          >
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-win-blue rounded-sm" />
              ))}
            </div>
          </motion.button>

          {/* Search Button */}
          <motion.button
            onClick={() => openWindow("file-explorer")}
            className="flex items-center gap-2 px-3 h-8 rounded hover:bg-muted/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-4 h-4 text-text-secondary" />
            <span className="text-xs text-text-muted hidden sm:inline">Search</span>
          </motion.button>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Open Windows */}
          {windows.map((window) => {
            const icon = desktopIcons.find((i) => i.id === window.id);
            if (!icon) return null;

            const Icon = icon.icon;
            const isActive = !window.isMinimized;

            return (
              <motion.button
                key={window.id}
                onClick={() => restoreWindow(window.id)}
                className={`flex items-center gap-2 px-3 h-8 rounded transition-colors ${
                  isActive
                    ? "bg-win-blue/20 border-b-2 border-win-blue"
                    : "bg-muted/50 hover:bg-muted opacity-70"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Restore ${icon.label}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium hidden sm:inline max-w-[100px] truncate">{icon.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Right: System Tray */}
        <div className="absolute right-2 flex items-center gap-1">
          {/* System Tray Toggle */}
          <button
            onClick={() => setShowSystemTray(!showSystemTray)}
            className="p-2 rounded hover:bg-muted/50 transition-colors"
          >
            <ChevronUp className={`w-3 h-3 text-text-secondary transition-transform ${showSystemTray ? "rotate-180" : ""}`} />
          </button>

          {/* System Icons */}
          {showSystemTray && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1"
            >
              <button className="p-2 rounded hover:bg-muted/50 transition-colors">
                <Wifi className="w-4 h-4 text-text-secondary" />
              </button>
              <button className="p-2 rounded hover:bg-muted/50 transition-colors">
                <Volume2 className="w-4 h-4 text-text-secondary" />
              </button>
              <button className="p-2 rounded hover:bg-muted/50 transition-colors">
                <Battery className="w-4 h-4 text-text-secondary" />
              </button>
            </motion.div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-muted/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Sun className="w-4 h-4 text-text-secondary" />
            ) : (
              <Moon className="w-4 h-4 text-text-secondary" />
            )}
          </button>

          {/* Clock */}
          <button className="flex flex-col items-end px-3 py-1 rounded hover:bg-muted/50 transition-colors">
            <span className="text-xs font-medium text-text-primary">{formatTime(time)}</span>
            <span className="text-[10px] text-text-muted">{formatDate(time)}</span>
          </button>
        </div>
      </div>
    </>
  );
};
