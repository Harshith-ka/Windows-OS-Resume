import { useState } from "react";
import { Folder, ChevronRight, Home, Clock, Star, FileText, Image, Code } from "lucide-react";
import { useDesktop } from "@/contexts/DesktopContext";

const folders = [
  { id: "about", name: "About Me", icon: FileText, section: "about" },
  { id: "skills", name: "Technical Skills", icon: Code, section: "skills" },
  { id: "experience", name: "Work Experience", icon: Folder, section: "experience" },
  { id: "projects", name: "Projects", icon: Image, section: "projects" },
  { id: "education", name: "Education", icon: Folder, section: "education" },
  { id: "contact", name: "Contact Info", icon: FileText, section: "contact" },
];

export const FileExplorer = () => {
  const { openWindow } = useDesktop();
  const [currentPath, setCurrentPath] = useState("Resume");

  const handleFolderClick = (section: string, name: string) => {
    openWindow(section);
    setCurrentPath(`Resume > ${name}`);
  };

  return (
    <div className="h-full flex flex-col bg-window">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-window-title">
        <div className="flex items-center gap-1 text-text-secondary">
          <button className="p-1.5 rounded hover:bg-muted/50 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted/50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 px-3 py-1.5 bg-muted/30 rounded border border-border text-sm text-text-primary">
          {currentPath}
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-border bg-muted/20 p-2">
          <div className="space-y-1">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted/50 transition-colors">
              <Home className="w-4 h-4 text-win-blue" />
              <span className="text-sm text-text-primary">Home</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded bg-muted/50">
              <Folder className="w-4 h-4 text-win-blue" />
              <span className="text-sm text-text-primary font-medium">Resume</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted/50 transition-colors">
              <Star className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-primary">Favorites</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted/50 transition-colors">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-primary">Recent</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {folders.map((folder) => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.id}
                  onDoubleClick={() => handleFolderClick(folder.section, folder.name)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="relative">
                    <Folder className="w-16 h-16 text-win-blue" fill="hsl(var(--win-blue) / 0.2)" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-win-blue-dark" />
                    </div>
                  </div>
                  <span className="text-sm text-text-primary text-center">{folder.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1.5 border-t border-border bg-window-title text-xs text-text-secondary">
        {folders.length} items
      </div>
    </div>
  );
};
