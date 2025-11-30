import { useState } from "react";
import { Palette, Monitor, Image as ImageIcon, Check } from "lucide-react";
import { useDesktop } from "@/contexts/DesktopContext";
import { toast } from "sonner";

const wallpapers = [
  { id: "default", name: "Default Blue", gradient: "from-blue-400 to-blue-600" },
  { id: "purple", name: "Purple Dream", gradient: "from-purple-400 to-purple-600" },
  { id: "green", name: "Nature Green", gradient: "from-green-400 to-green-600" },
  { id: "orange", name: "Sunset Orange", gradient: "from-orange-400 to-red-500" },
  { id: "pink", name: "Pink Candy", gradient: "from-pink-400 to-pink-600" },
  { id: "dark", name: "Dark Mode", gradient: "from-gray-800 to-gray-900" },
];

export const SettingsApp = () => {
  const { theme, toggleTheme } = useDesktop();
  const [activeTab, setActiveTab] = useState<"personalize" | "display">("personalize");
  const [selectedWallpaper, setSelectedWallpaper] = useState("default");

  const handleWallpaperChange = (wallpaperId: string) => {
    setSelectedWallpaper(wallpaperId);
    const wallpaper = wallpapers.find((w) => w.id === wallpaperId);
    if (wallpaper) {
      document.documentElement.style.setProperty(
        "--desktop-bg",
        wallpaper.gradient === "from-gray-800 to-gray-900" ? "220 15% 10%" : "210 100% 97%"
      );
      toast.success(`Wallpaper changed to ${wallpaper.name}`);
    }
  };

  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-56 border-r border-border bg-muted/20 p-4">
        <h2 className="text-lg font-bold text-text-primary mb-4">Settings</h2>
        <div className="space-y-1">
          <button
            onClick={() => setActiveTab("personalize")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              activeTab === "personalize" ? "bg-muted text-text-primary" : "hover:bg-muted/50 text-text-secondary"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span className="text-sm">Personalization</span>
          </button>
          <button
            onClick={() => setActiveTab("display")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              activeTab === "display" ? "bg-muted text-text-primary" : "hover:bg-muted/50 text-text-secondary"
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="text-sm">Display</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "personalize" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Personalization</h3>
              <p className="text-sm text-text-secondary">Customize the appearance of your desktop</p>
            </div>

            {/* Theme Toggle */}
            <div className="glass p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Theme
              </h4>
              <div className="flex gap-3">
                <button
                  onClick={theme === "dark" ? toggleTheme : undefined}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    theme === "light" ? "border-win-blue bg-muted" : "border-border hover:border-win-blue/50"
                  }`}
                >
                  <div className="w-full h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded mb-2" />
                  <p className="text-sm font-medium text-text-primary">Light</p>
                </button>
                <button
                  onClick={theme === "light" ? toggleTheme : undefined}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    theme === "dark" ? "border-win-blue bg-muted" : "border-border hover:border-win-blue/50"
                  }`}
                >
                  <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2" />
                  <p className="text-sm font-medium text-text-primary">Dark</p>
                </button>
              </div>
            </div>

            {/* Wallpaper */}
            <div className="glass p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Background
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {wallpapers.map((wallpaper) => (
                  <button
                    key={wallpaper.id}
                    onClick={() => handleWallpaperChange(wallpaper.id)}
                    className={`relative p-2 rounded-lg border-2 transition-all ${
                      selectedWallpaper === wallpaper.id
                        ? "border-win-blue"
                        : "border-border hover:border-win-blue/50"
                    }`}
                  >
                    <div className={`w-full h-24 bg-gradient-to-br ${wallpaper.gradient} rounded mb-2`} />
                    {selectedWallpaper === wallpaper.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-win-blue rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <p className="text-xs font-medium text-text-primary">{wallpaper.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "display" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Display Settings</h3>
              <p className="text-sm text-text-secondary">Adjust your screen and layout settings</p>
            </div>

            <div className="glass p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-3">Display Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Resolution:</span>
                  <span className="text-text-primary font-medium">
                    {window.innerWidth} × {window.innerHeight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Color Depth:</span>
                  <span className="text-text-primary font-medium">32-bit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Refresh Rate:</span>
                  <span className="text-text-primary font-medium">60 Hz</span>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-3">Scale and Layout</h4>
              <p className="text-xs text-text-muted mb-3">Change the size of text, apps, and other items</p>
              <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-text-primary">
                <option>100% (Recommended)</option>
                <option>125%</option>
                <option>150%</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
