import { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";
import { resumeData } from "@/lib/resumeData";

export const TerminalApp = () => {
  const [history, setHistory] = useState<string[]>([
    "Windows PowerShell",
    "Copyright (c) Microsoft Corporation. All rights reserved.",
    "",
    'Type "help" for available commands.',
    "",
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `> ${cmd}`, ""];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    switch (trimmed) {
      case "help":
        newHistory.push(
          "Available commands:",
          "  about       - Display personal information",
          "  skills      - List all skills",
          "  skills react - Show React-related skills",
          "  skills node  - Show Node.js-related skills",
          "  projects    - List all projects",
          "  projects mern - Show MERN stack projects",
          "  experience  - Display work experience",
          "  education   - Show education background",
          "  contact     - Display contact information",
          "  clear       - Clear terminal",
          ""
        );
        break;

      case "about":
        newHistory.push(
          `Name: ${resumeData.personal.name}`,
          `Title: ${resumeData.personal.title}`,
          "",
          "Bio:",
          resumeData.personal.bio,
          ""
        );
        break;

      case "skills":
        resumeData.skills.forEach((category) => {
          newHistory.push(`[${category.category}]`);
          category.items.forEach((skill) => {
            newHistory.push(`  - ${skill.name}: ${skill.level}%`);
          });
          newHistory.push("");
        });
        break;

      case "skills react":
      case "skills react.js":
        const frontendSkills = resumeData.skills.find(
          (cat) => cat.category === "Frontend"
        );
        if (frontendSkills) {
          newHistory.push("[React & Related Skills]");
          frontendSkills.items
            .filter((s) =>
              s.name.toLowerCase().includes("react") ||
              s.name.toLowerCase().includes("next")
            )
            .forEach((skill) => {
              newHistory.push(`  - ${skill.name}: ${skill.level}%`);
            });
          newHistory.push("");
        }
        break;

      case "skills node":
      case "skills node.js":
      case "skills nodejs":
        const backendSkills = resumeData.skills.find(
          (cat) => cat.category === "Backend"
        );
        if (backendSkills) {
          newHistory.push("[Node.js & Related Skills]");
          backendSkills.items
            .filter((s) => s.name.toLowerCase().includes("node"))
            .forEach((skill) => {
              newHistory.push(`  - ${skill.name}: ${skill.level}%`);
            });
          newHistory.push("");
        }
        break;

      case "projects":
        resumeData.projects.forEach((project, idx) => {
          newHistory.push(
            `${idx + 1}. ${project.name}`,
            `   Description: ${project.description}`,
            `   Tech: ${project.tech.join(", ")}`,
            ""
          );
        });
        break;

      case "projects mern":
        newHistory.push("[MERN Stack Projects]");
        const mernTechs = ["mongodb", "express", "react", "node"];
        resumeData.projects
          .filter((p) =>
            p.tech.some((t) =>
              mernTechs.some((mern) => t.toLowerCase().includes(mern))
            )
          )
          .forEach((project) => {
            newHistory.push(
              `  - ${project.name}`,
              `    ${project.description}`,
              `    Stack: ${project.tech.join(", ")}`,
              ""
            );
          });
        if (
          !resumeData.projects.some((p) =>
            p.tech.some((t) =>
              mernTechs.some((mern) => t.toLowerCase().includes(mern))
            )
          )
        ) {
          newHistory.push("  No MERN stack projects found.", "");
        }
        break;

      case "experience":
        resumeData.experience.forEach((exp) => {
          newHistory.push(
            `${exp.position} @ ${exp.company}`,
            `${exp.duration} | ${exp.location}`,
            `Achievements:`,
            ...exp.achievements.map(a => `  • ${a}`),
            ""
          );
        });
        break;

      case "education":
        resumeData.education.forEach((edu) => {
          newHistory.push(
            `${edu.degree} - ${edu.field}`,
            `${edu.institution} | ${edu.duration}`,
            edu.gpa ? `GPA: ${edu.gpa}` : "",
            ""
          );
        });
        break;

      case "contact":
        newHistory.push(
          "Contact Information:",
          `  Email: ${resumeData.personal.email}`,
          `  Phone: ${resumeData.personal.phone}`,
          `  Location: ${resumeData.personal.location}`,
          `  LinkedIn: ${resumeData.personal.linkedin}`,
          `  GitHub: ${resumeData.personal.github}`,
          ""
        );
        break;

      case "clear":
        setHistory([
          "Windows PowerShell",
          "Copyright (c) Microsoft Corporation. All rights reserved.",
          "",
        ]);
        setInput("");
        return;

      default:
        newHistory.push(
          `'${trimmed}' is not recognized as a command.`,
          'Type "help" for available commands.',
          ""
        );
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#012456] text-white font-mono p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/20">
        <Terminal className="w-5 h-5" />
        <span className="text-sm font-semibold">Windows PowerShell</span>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto scrollbar-hide text-sm leading-relaxed"
      >
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <span className="text-green-400">PS C:\Users\Guest&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white"
          autoFocus
        />
      </form>
    </div>
  );
};
