import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush } from "fabric";
import { Pencil, Square, Circle as CircleIcon, Eraser, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

export const PaintApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"pencil" | "rectangle" | "circle" | "eraser">("pencil");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = 3;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "pencil" || activeTool === "eraser";

    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeTool === "eraser" ? "#ffffff" : activeColor;
      fabricCanvas.freeDrawingBrush.width = activeTool === "eraser" ? 20 : 3;
    }
  }, [activeTool, activeColor, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 150,
        height: 100,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas?.add(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 50,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas?.add(circle);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast.success("Canvas cleared!");
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({ format: "png", multiplier: 1 });
    const link = document.createElement("a");
    link.download = "my-drawing.png";
    link.href = dataURL;
    link.click();
    toast.success("Drawing downloaded!");
  };

  const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500"];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-window-title">
        <div className="flex items-center gap-1 border-r border-border pr-2">
          <button
            onClick={() => handleToolClick("pencil")}
            className={`p-2 rounded transition-colors ${
              activeTool === "pencil" ? "bg-win-blue text-white" : "hover:bg-muted/50"
            }`}
            title="Pencil"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolClick("eraser")}
            className={`p-2 rounded transition-colors ${
              activeTool === "eraser" ? "bg-win-blue text-white" : "hover:bg-muted/50"
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolClick("rectangle")}
            className={`p-2 rounded transition-colors ${
              activeTool === "rectangle" ? "bg-win-blue text-white" : "hover:bg-muted/50"
            }`}
            title="Rectangle"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToolClick("circle")}
            className={`p-2 rounded transition-colors ${
              activeTool === "circle" ? "bg-win-blue text-white" : "hover:bg-muted/50"
            }`}
            title="Circle"
          >
            <CircleIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1 border-r border-border pr-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className={`w-6 h-6 rounded border-2 transition-transform ${
                activeColor === color ? "border-win-blue scale-110" : "border-border"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        <div className="flex-1" />

        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-3 py-1.5 border border-border rounded hover:bg-muted/50 transition-colors text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 bg-win-blue text-white rounded hover:bg-win-blue-dark transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          Save
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 bg-muted/20 overflow-auto">
        <div className="border-2 border-border shadow-lg bg-white">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};
