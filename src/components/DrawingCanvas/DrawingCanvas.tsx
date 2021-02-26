import React, { useEffect, useRef, useState } from "react";
import PaperCanvas from "../PaperCanvas/PaperCanvas";
import "./DrawingCanvas.scss";

type Tool = "Circle" | "Rectangle";

type Props = {
  tool: Tool;
  height: number;
  paperScope: paper.PaperScope;
};

const DrawingCanvas: React.FC<Props> = (props) => {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const { paperScope, tool } = props;
  let paperProject: paper.Project;
  console.log("PaperCanvas", paperScope, canvasRef, tool);
  let selectedItem: paper.Path.Circle | paper.Path.Rectangle | null;

  const setupPaperProject = () => {
    paperProject = paperScope.project;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      paperScope.setup(canvas);
      paperScope.view.onMouseUp = onMouseUp;
      console.log("Setup canvas", canvas);
    } else {
      console.error("No canvas");
    }
  }, [paperScope]);

  useEffect(() => {
    if (paperScope.view) {
      paperScope.view.onMouseUp = onMouseUp;
      paperScope.view.onMouseDown = onMouseDown;
      paperScope.view.onMouseDrag = onMouseDrag;
    }
    console.log("Setup Events", tool);
  }, [tool]);

  useEffect(() => {
    setupPaperProject();
  });

  const drawCircle = (e: paper.MouseEvent) => {
    const circle = new paperScope.Path.Circle(e.point, 20);
    circle.translate(new paperScope.Point([-20, -20]));
    circle.strokeWidth = 1;
    circle.strokeColor = new paperScope.Color("Black");
    circle.selected = true;

    paperProject.activeLayer.addChild(circle);
    selectedItem = circle;
  };

  const drawRectangle = (e: paper.MouseEvent) => {
    const rectangle = new paperScope.Path.Rectangle(
      e.point,
      new paperScope.Size(50, 50)
    );
    rectangle.translate(new paperScope.Point([-50, -50]));
    rectangle.strokeWidth = 1;
    rectangle.strokeColor = new paperScope.Color("Black");

    paperProject.activeLayer.addChild(rectangle);
    selectedItem = rectangle;
  };

  const onMouseUp = (_event: paper.MouseEvent) => {
    if (selectedItem) selectedItem.selected = false;
    selectedItem = null;
  };

  const onMouseDown = (event: paper.MouseEvent) => {
    switch (tool) {
      case "Circle":
        drawCircle(event);
        break;
      case "Rectangle":
        drawRectangle(event);
        break;
    }
  };

  const onMouseDrag = (event: paper.MouseEvent) => {
    if (selectedItem) {
      selectedItem.bounds.width += event.delta.x;
      selectedItem.bounds.height += event.delta.y;
    } else {
      console.log("no selected item");
    }
  };

  return (
    <PaperCanvas
      height={props.height}
      className="DrawingCanvas"
      ref={canvasRef}
    />
  );
};

export default DrawingCanvas;
