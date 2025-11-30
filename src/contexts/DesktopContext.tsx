import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface WindowState {
  id: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface DesktopContextType {
  windows: WindowState[];
  activeWindow: string | null;
  theme: "light" | "dark";
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  setActiveWindow: (id: string) => void;
  toggleTheme: () => void;
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export const useDesktop = () => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error("useDesktop must be used within DesktopProvider");
  }
  return context;
};

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [maxZIndex, setMaxZIndex] = useState(1000);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("desktop-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("desktop-theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  }, []);

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        // Window already open, just bring to front
        const newMaxZ = maxZIndex + 1;
        setMaxZIndex(newMaxZ);
        setActiveWindow(id);
        return prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: newMaxZ } : w));
      }
      // Open new window
      const newMaxZ = maxZIndex + 1;
      setMaxZIndex(newMaxZ);
      setActiveWindow(id);
      return [...prev, { id, isMinimized: false, isMaximized: false, zIndex: newMaxZ }];
    });
  }, [maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindow((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
    setActiveWindow(null);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const newMaxZ = maxZIndex + 1;
      setMaxZIndex(newMaxZ);
      setActiveWindow(id);
      return prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: newMaxZ } : w));
    });
  }, [maxZIndex]);

  const handleSetActiveWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const newMaxZ = maxZIndex + 1;
      setMaxZIndex(newMaxZ);
      return prev.map((w) => (w.id === id ? { ...w, zIndex: newMaxZ } : w));
    });
    setActiveWindow(id);
  }, [maxZIndex]);

  return (
    <DesktopContext.Provider
      value={{
        windows,
        activeWindow,
        theme,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        setActiveWindow: handleSetActiveWindow,
        toggleTheme,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
};
