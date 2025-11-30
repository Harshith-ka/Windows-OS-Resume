import { useState, useEffect } from "react";
import { Save, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const NotepadApp = () => {
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("notepad-content");
    if (saved) setContent(saved);

    const notes = localStorage.getItem("saved-notes");
    if (notes) setSavedNotes(JSON.parse(notes));
  }, []);

  const handleSave = () => {
    localStorage.setItem("notepad-content", content);
    const notes = [...savedNotes];
    if (!notes.includes(content) && content.trim()) {
      notes.push(content);
      setSavedNotes(notes);
      localStorage.setItem("saved-notes", JSON.stringify(notes));
    }
    toast.success("Note saved!");
  };

  const handleClear = () => {
    setContent("");
    localStorage.removeItem("notepad-content");
    toast.info("Note cleared");
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-window-title">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-1.5 bg-win-blue text-white rounded hover:bg-win-blue-dark transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-3 py-1.5 border border-border rounded hover:bg-muted/50 transition-colors text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
        <div className="flex-1" />
        <div className="text-xs text-text-muted">{content.length} characters</div>
      </div>

      {/* Text Area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your notes..."
        className="flex-1 p-4 bg-background text-text-primary font-mono text-sm resize-none outline-none"
        spellCheck={false}
      />

      {/* Status Bar */}
      <div className="px-4 py-1.5 border-t border-border bg-window-title text-xs text-text-secondary flex items-center gap-4">
        <span>Notepad</span>
        <span>|</span>
        <span>UTF-8</span>
        <span>|</span>
        <span>Line 1, Column 1</span>
      </div>
    </div>
  );
};
