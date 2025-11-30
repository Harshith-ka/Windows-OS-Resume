import { useDesktop } from "@/contexts/DesktopContext";
import { desktopIcons } from "@/lib/resumeData";
import { X, Cpu, MemoryStick, HardDrive, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TaskManagerApp = () => {
  const { windows, closeWindow } = useDesktop();

  const getIconForWindow = (id: string) => {
    const icon = desktopIcons.find((i) => i.id === id);
    return icon ? icon.icon : Activity;
  };

  const getNameForWindow = (id: string) => {
    const icon = desktopIcons.find((i) => i.id === id);
    return icon ? icon.label : id;
  };

  // Mock system stats
  const systemStats = {
    cpu: Math.floor(Math.random() * 30 + 10),
    memory: Math.floor(Math.random() * 40 + 30),
    disk: Math.floor(Math.random() * 20 + 50),
  };

  return (
    <div className="flex flex-col h-full bg-window">
      {/* Header Tabs */}
      <div className="flex border-b border-border bg-muted/30">
        <div className="px-4 py-2 border-b-2 border-win-blue text-sm font-medium text-text-primary">
          Processes
        </div>
        <div className="px-4 py-2 text-sm text-text-secondary hover:bg-muted/50 cursor-not-allowed">
          Performance
        </div>
        <div className="px-4 py-2 text-sm text-text-secondary hover:bg-muted/50 cursor-not-allowed">
          App history
        </div>
      </div>

      {/* System Stats Bar */}
      <div className="flex items-center justify-around py-3 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2 text-sm">
          <Cpu className="w-4 h-4 text-win-blue" />
          <span className="text-text-secondary">CPU:</span>
          <span className="font-semibold text-text-primary">{systemStats.cpu}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MemoryStick className="w-4 h-4 text-green-500" />
          <span className="text-text-secondary">Memory:</span>
          <span className="font-semibold text-text-primary">{systemStats.memory}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <HardDrive className="w-4 h-4 text-orange-500" />
          <span className="text-text-secondary">Disk:</span>
          <span className="font-semibold text-text-primary">{systemStats.disk}%</span>
        </div>
      </div>

      {/* Processes Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-2 text-sm font-medium text-text-secondary">Name</th>
              <th className="text-left px-4 py-2 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left px-4 py-2 text-sm font-medium text-text-secondary">CPU</th>
              <th className="text-left px-4 py-2 text-sm font-medium text-text-secondary">Memory</th>
              <th className="text-right px-4 py-2 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {windows.map((window) => {
              const Icon = getIconForWindow(window.id);
              const name = getNameForWindow(window.id);
              const cpuUsage = Math.floor(Math.random() * 5 + 1);
              const memUsage = Math.floor(Math.random() * 100 + 50);

              return (
                <tr
                  key={window.id}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-win-blue" />
                      <span className="text-sm font-medium text-text-primary">{name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
                      Running
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{cpuUsage}%</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{memUsage} MB</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => closeWindow(window.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4 mr-1" />
                      End task
                    </Button>
                  </td>
                </tr>
              );
            })}
            {windows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-text-secondary">
                  No running applications
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/20 text-xs text-text-secondary">
        <span>Processes: {windows.length}</span>
        <span>Windows OS Resume v1.0</span>
      </div>
    </div>
  );
};