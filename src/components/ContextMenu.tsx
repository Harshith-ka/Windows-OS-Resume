import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Image, Palette, Monitor, Settings, Info } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
  onSettings?: () => void;
}

export const ContextMenu = ({ x, y, isOpen, onClose, onRefresh, onSettings }: ContextMenuProps) => {
  const menuItems = [
    { icon: RefreshCw, label: "Refresh", onClick: onRefresh },
    { divider: true },
    { icon: Image, label: "Personalize", onClick: onSettings },
    { icon: Palette, label: "Display settings", onClick: onSettings },
    { icon: Monitor, label: "Desktop settings", onClick: onSettings },
    { divider: true },
    { icon: Info, label: "About", onClick: () => window.open("https://github.com", "_blank") },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={onClose}
            onContextMenu={(e) => {
              e.preventDefault();
              onClose();
            }}
          />

          {/* Context Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{ left: x, top: y }}
            className="fixed z-[9999] w-64 glass-strong rounded-lg overflow-hidden shadow-2xl py-1"
          >
            {menuItems.map((item, index) => {
              if (item.divider) {
                return <div key={index} className="h-px bg-border my-1" />;
              }

              const Icon = item.icon!;
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted/50 transition-colors text-left"
                >
                  <Icon className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-text-primary">{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
