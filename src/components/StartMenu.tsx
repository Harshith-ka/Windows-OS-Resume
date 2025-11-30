import { useState } from "react";
import { Search, Power, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktop } from "@/contexts/DesktopContext";
import { desktopIcons } from "@/lib/resumeData";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartMenu = ({ isOpen, onClose }: StartMenuProps) => {
  const { openWindow } = useDesktop();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIcons = desktopIcons.filter((icon) =>
    icon.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIconClick = (id: string) => {
    openWindow(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990]"
            onClick={onClose}
          />

          {/* Start Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[9995] w-[640px] max-w-[90vw]"
          >
            <div className="glass-strong rounded-xl overflow-hidden shadow-2xl">
              {/* Search Bar */}
              <div className="p-4 border-b border-glass-border/30">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search for apps, settings, and documents"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-win-blue/50"
                    autoFocus
                  />
                </div>
              </div>

              {/* Pinned Apps Grid */}
              <div className="p-6">
                <h3 className="text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">
                  Pinned
                </h3>
                <div className="grid grid-cols-6 gap-4">
                  {filteredIcons.map((icon) => {
                    const Icon = icon.icon;
                    return (
                      <button
                        key={icon.id}
                        onClick={() => handleIconClick(icon.id)}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-win-blue to-win-blue-light flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-text-primary text-center line-clamp-2">
                          {icon.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-3 border-t border-glass-border/30 bg-muted/30">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <User className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-text-primary">John Doe</span>
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleIconClick("settings");
                    }}
                    className="w-10 h-10 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center"
                  >
                    <Settings className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button className="w-10 h-10 rounded-lg hover:bg-destructive/10 transition-colors flex items-center justify-center">
                    <Power className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
