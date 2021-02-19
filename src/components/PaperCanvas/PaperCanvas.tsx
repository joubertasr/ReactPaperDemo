import React, { useEffect, useRef } from "react";
import "./PaperCanvas.scss";

type Tool = "Circle" | "Rectangle";

type Props = {
  tool: Tool;
  height: number;
  paperScope: paper.PaperScope;
};

const PaperCanvas: React.FC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { paperScope, tool } = props;
  let paperProject: paper.Project;
  console.log("PaperCanvas", paperScope, canvasRef, tool);

  const setupPaperProject = () => {
    paperProject = paperScope.project;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      paperScope.setup(canvas);
      paperScope.view.onMouseUp = onMouseUp;
      console.log("Setup canvas", canvas);
    }
  }, [paperScope]);

  useEffect(() => {
    paperScope.view.onMouseUp = onMouseUp;
    console.log("Setup Events", tool);
  }, [tool]);

  useEffect(() => {
    setupPaperProject();
  });

  const drawCircle = (e: paper.MouseEvent) => {
    const circle = paperProject.activeLayer.addChild(
      new paperScope.Shape.Circle(e.point, 20)
    );
    circle.strokeWidth = 1;
    circle.strokeColor = new paperScope.Color("Black");
  };

  const drawRectangle = (e: paper.MouseEvent) => {
    const rectangle = paperProject.activeLayer.addChild(
      new paperScope.Shape.Rectangle(e.point, new paperScope.Size(20, 20))
    );
    rectangle.strokeWidth = 1;
    rectangle.strokeColor = new paperScope.Color("Black");
  };

  const onMouseUp = (event: any) => {
    switch (tool) {
      case "Circle":
        drawCircle(event);
        break;
      case "Rectangle":
        drawRectangle(event);
        break;
    }
  };

  return (
    <canvas ref={canvasRef} height={props.height} className="PaperCanvas" />
  );
};

export default PaperCanvas;
