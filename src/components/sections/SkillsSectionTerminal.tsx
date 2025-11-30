import { useState, useEffect } from "react";
import { resumeData } from "@/lib/resumeData";
import { Terminal } from "lucide-react";

export const SkillsSectionTerminal = () => {
  const { skills } = resumeData;
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const allLines = [
      "$ whoami",
      "> Full-Stack Developer",
      "",
      "$ cat skills.txt",
      "",
      ...skills.flatMap((category) => [
        `# ${category.category.toUpperCase()}`,
        ...category.items.map((skill) => `  [${skill.level}%] ${skill.name}`),
        "",
      ]),
      "$ █",
    ];

    const timer = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < allLines.length) {
          setLines(allLines.slice(0, prev + 1));
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [skills]);

  return (
    <div className="h-full bg-[#0C0C0C] text-[#CCCCCC] font-mono p-6 overflow-auto">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#333]">
        <Terminal className="w-4 h-4 text-[#00FF00]" />
        <span className="text-xs">PowerShell - Skills</span>
      </div>

      {/* Terminal Content */}
      <div className="space-y-1">
        {lines.map((line, index) => {
          if (line.startsWith("$")) {
            return (
              <div key={index} className="flex items-center gap-2">
                <span className="text-[#00FF00]">PS C:\Resume&gt;</span>
                <span className="text-[#FFFFFF]">{line.substring(2)}</span>
              </div>
            );
          }
          if (line.startsWith(">")) {
            return (
              <div key={index} className="text-[#00FFFF] pl-6">
                {line.substring(2)}
              </div>
            );
          }
          if (line.startsWith("#")) {
            return (
              <div key={index} className="text-[#FFD700] font-bold mt-2">
                {line}
              </div>
            );
          }
          if (line.startsWith("  [")) {
            const match = line.match(/\[(\d+)%\] (.+)/);
            if (match) {
              const percent = parseInt(match[1]);
              const name = match[2];
              const bars = "█".repeat(Math.floor(percent / 10));
              return (
                <div key={index} className="flex items-center gap-2 pl-8">
                  <span className="text-[#00FF00] w-24">{name}</span>
                  <span className="text-[#FFD700]">{bars}</span>
                  <span className="text-[#666]">{percent}%</span>
                </div>
              );
            }
          }
          return (
            <div key={index} className="text-[#888]">
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};
