import { useState, useEffect } from "react";
import { desktopIcons } from "@/lib/resumeData";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { useDesktop } from "@/contexts/DesktopContext";
import { ContextMenu } from "./ContextMenu";
import { StickyNotePopup } from "./StickyNotePopup";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSectionTerminal } from "./sections/SkillsSectionTerminal";
import { ExperienceSectionCareer } from "./sections/ExperienceSectionCareer";
import { ProjectsSectionGallery } from "./sections/ProjectsSectionGallery";
import { EducationSectionSticky } from "./sections/EducationSectionSticky";
import { ContactSectionMail } from "./sections/ContactSectionMail";
import { FileExplorer } from "./FileExplorer";
import { NotepadApp } from "./apps/NotepadApp";
import { CalculatorApp } from "./apps/CalculatorApp";
import { PaintApp } from "./apps/PaintApp";
import { SettingsApp } from "./apps/SettingsApp";
import { TaskManagerApp } from "./apps/TaskManagerApp";
import { TerminalApp } from "./apps/TerminalApp";
import { FunApp } from "./apps/FunApp";
import { MiniGameApp } from "./apps/MiniGameApp";
import { FAQAssistantApp } from "./apps/FAQAssistantApp";
import Draggable from "react-draggable";
import { toast } from "sonner";

const sectionComponents: Record<string, React.FC> = {
  about: AboutSection,
  skills: SkillsSectionTerminal,
  experience: ExperienceSectionCareer,
  projects: ProjectsSectionGallery,
  education: EducationSectionSticky,
  contact: ContactSectionMail,
  "file-explorer": FileExplorer,
  notepad: NotepadApp,
  calculator: CalculatorApp,
  paint: PaintApp,
  settings: SettingsApp,
  "task-manager": TaskManagerApp,
  terminal: TerminalApp,
  "secret-game": MiniGameApp,
  "faq-assistant": FAQAssistantApp,
  fun: FunApp,
};

interface IconPosition {
  x: number;
  y: number;
}

export const Desktop = () => {
  const { windows, openWindow } = useDesktop();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>({});
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("desktop-icon-positions");
    if (saved) {
      setIconPositions(JSON.parse(saved));
    } else {
      const initial: Record<string, IconPosition> = {};
      desktopIcons.forEach((icon) => {
        initial[icon.id] = { x: icon.x || 0, y: icon.y || 0 };
      });
      setIconPositions(initial);
    }
  }, []);

  // Konami Code Detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...konamiSequence, e.key].slice(-10);
      setKonamiSequence(newSequence);

      if (newSequence.join(",") === konamiCode.join(",")) {
        toast.success("🎮 Konami Code Activated! Opening secret window...");
        openWindow("fun");
        setKonamiSequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiSequence, openWindow]);

  const handleIconDrag = (id: string, x: number, y: number) => {
    const newPositions = { ...iconPositions, [id]: { x, y } };
    setIconPositions(newPositions);
    localStorage.setItem("desktop-icon-positions", JSON.stringify(newPositions));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative w-full h-[calc(100vh-48px)] bg-desktop overflow-hidden"
      onContextMenu={handleContextMenu}
    >
      <StickyNotePopup />
      
      <ContextMenu
        x={contextMenu?.x || 0}
        y={contextMenu?.y || 0}
        isOpen={!!contextMenu}
        onClose={() => setContextMenu(null)}
        onRefresh={() => window.location.reload()}
        onSettings={() => {
          openWindow("settings");
          setContextMenu(null);
        }}
      />
      {/* Desktop Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--desktop-pattern)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute inset-0">
        {desktopIcons.map((icon) => {
          const position = iconPositions[icon.id] || { x: icon.x || 0, y: icon.y || 0 };
          return (
            <Draggable
              key={icon.id}
              position={position}
              onStop={(_, data) => handleIconDrag(icon.id, data.x, data.y)}
              bounds="parent"
            >
              <div className="absolute">
                <DesktopIcon label={icon.label} icon={icon.icon} onClick={() => openWindow(icon.id)} />
              </div>
            </Draggable>
          );
        })}
      </div>

      {/* Windows */}
      {windows.map((window) => {
        const SectionComponent = sectionComponents[window.id];
        const getTitleAndIcon = () => {
          if (window.id === "file-explorer") return "File Explorer";
          if (window.id === "settings") return "Settings";
          return desktopIcons.find((icon) => icon.id === window.id)?.label || "Window";
        };

        return (
          <Window
            key={window.id}
            id={window.id}
            title={getTitleAndIcon()}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            zIndex={window.zIndex}
          >
            {SectionComponent && <SectionComponent />}
          </Window>
        );
      })}
    </div>
  );
};
