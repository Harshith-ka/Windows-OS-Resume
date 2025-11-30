import { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const DesktopIcon = ({ icon: Icon, label, onClick }: DesktopIconProps) => {
  return (
    <button
      onClick={onClick}
      className="desktop-icon flex flex-col items-center justify-center w-20 h-20 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-win-blue group"
      aria-label={`Open ${label}`}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-1 rounded-lg bg-win-blue/20 group-hover:bg-win-blue/30 transition-colors">
        <Icon className="w-6 h-6 text-win-blue" />
      </div>
      <span className="text-xs font-medium text-center text-text-primary drop-shadow-lg">
        {label}
      </span>
    </button>
  );
};
