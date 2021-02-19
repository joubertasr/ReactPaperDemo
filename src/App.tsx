import React, { useState } from "react";
import "./App.css";
import Paper from "paper";
import PaperCanvas from "./components/PaperCanvas/PaperCanvas";

const paperScope = new Paper.PaperScope();
function App() {
  const [tool, setTool] = useState<"Circle" | "Rectangle">("Circle");
  return (
    <div className="App">
      <header className="App-header">
        <h2>Paper JS Demo</h2>
        <button
          className="App-link"
          onClick={() => {
            setTool("Circle");
            return false;
          }}
        >
          Circle
        </button>
        <button
          className="App-link"
          onClick={() => {
            setTool("Rectangle");
            return false;
          }}
        >
          Rectangle
        </button>
      </header>
      <div>
        <PaperCanvas height={200} tool={tool} paperScope={paperScope} />
      </div>
    </div>
  );
}

export default App;
