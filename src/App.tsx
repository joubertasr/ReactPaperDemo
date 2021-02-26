import React, { useState } from "react";
import "./App.css";
import Paper from "paper";
import PaperCanvas from "./components/PaperCanvas/PaperCanvas";
import DrawingCanvas from "./components/DrawingCanvas/DrawingCanvas";

const paperScope = new Paper.PaperScope();
function App() {
  const [tool, setTool] = useState<"Circle" | "Rectangle">("Circle");
  return (
    <div className="App">
      <header className="App-header">
        <h2>Paper JS Demo</h2>
        <div className="Row">
          <button
            className={`App-link ${
              tool === "Circle" ? "App-link-selected" : ""
            }`}
            onClick={() => {
              setTool("Circle");
              return false;
            }}
          >
            Circle
          </button>
          <button
            className={`App-link ${
              tool === "Rectangle" ? "App-link-selected" : ""
            }`}
            onClick={() => {
              setTool("Rectangle");
              return false;
            }}
          >
            Rectangle
          </button>
        </div>
      </header>
      <div>
        <DrawingCanvas height={800} tool={tool} paperScope={paperScope} />
      </div>
    </div>
  );
}

export default App;
