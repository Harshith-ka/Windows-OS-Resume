import { useState } from "react";
import { Delete } from "lucide-react";

export const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (equation === "") {
      setEquation(`${inputValue} ${nextOperator}`);
    } else {
      try {
        const result = eval(equation.replace("×", "*").replace("÷", "/") + display);
        setDisplay(String(result));
        setEquation(nextOperator ? `${result} ${nextOperator}` : "");
      } catch (error) {
        setDisplay("Error");
        setEquation("");
      }
    }
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    performOperation("");
  };

  const buttons = [
    { label: "C", className: "col-span-2 bg-destructive/10 hover:bg-destructive/20 text-destructive", onClick: clear },
    { label: "⌫", className: "bg-muted hover:bg-muted/80", onClick: () => setDisplay(display.slice(0, -1) || "0") },
    { label: "÷", className: "bg-win-blue/10 hover:bg-win-blue/20 text-win-blue", onClick: () => performOperation("÷") },
    { label: "7", onClick: () => inputDigit("7") },
    { label: "8", onClick: () => inputDigit("8") },
    { label: "9", onClick: () => inputDigit("9") },
    { label: "×", className: "bg-win-blue/10 hover:bg-win-blue/20 text-win-blue", onClick: () => performOperation("×") },
    { label: "4", onClick: () => inputDigit("4") },
    { label: "5", onClick: () => inputDigit("5") },
    { label: "6", onClick: () => inputDigit("6") },
    { label: "-", className: "bg-win-blue/10 hover:bg-win-blue/20 text-win-blue", onClick: () => performOperation("-") },
    { label: "1", onClick: () => inputDigit("1") },
    { label: "2", onClick: () => inputDigit("2") },
    { label: "3", onClick: () => inputDigit("3") },
    { label: "+", className: "bg-win-blue/10 hover:bg-win-blue/20 text-win-blue", onClick: () => performOperation("+") },
    { label: "±", onClick: () => setDisplay(String(-parseFloat(display))) },
    { label: "0", onClick: () => inputDigit("0") },
    { label: ".", onClick: inputDecimal },
    { label: "=", className: "bg-win-blue hover:bg-win-blue-dark text-white", onClick: handleEquals },
  ];

  return (
    <div className="h-full flex flex-col bg-background p-4">
      {/* Display */}
      <div className="mb-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-xs text-text-muted mb-1 min-h-[16px]">{equation}</div>
        <div className="text-3xl font-bold text-text-primary text-right break-all">{display}</div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`rounded-lg font-semibold text-lg transition-colors ${
              btn.className || "bg-muted/50 hover:bg-muted text-text-primary"
            } ${btn.label === "C" ? "col-span-2" : ""}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
