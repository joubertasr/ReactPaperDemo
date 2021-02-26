import { eventNames } from "process";
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
  let selectedItem: paper.Item | null;
  let altKey: boolean = false;

  let transform: "resize" | "move" = "resize";

  const setupPaperProject = () => {
    paperProject = paperScope.project;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      paperScope.setup(canvas);
      paperScope.tools.push(new paperScope.Tool());
    } else {
      console.error("No canvas");
    }
  }, [paperScope]);

  useEffect(() => {
    if (paperScope.view) {
      paperScope.view.onMouseUp = onMouseUp;
      paperScope.view.onMouseDown = onMouseDown;
      paperScope.view.onMouseDrag = onMouseDrag;
      paperScope.tool.onKeyDown = onKeyDown;
      paperScope.tool.onKeyUp = onKeyUp;
    }
    console.log("Setup Events", tool);
  }, [tool]);

  useEffect(() => {
    setupPaperProject();
  });

  const drawCircle = (e: paper.MouseEvent) => {
    const circle = new paperScope.Path.Circle(e.point, 20);
    circle.translate(new paperScope.Point([-20, -20]));
    circle.strokeWidth = 3;
    circle.strokeColor = new paperScope.Color("Black");
    circle.fillColor = new paperScope.Color("White");
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
    rectangle.strokeWidth = 3;
    rectangle.strokeColor = new paperScope.Color("Black");
    rectangle.fillColor = new paperScope.Color("White");
    rectangle.selected = true;

    paperProject.activeLayer.addChild(rectangle);
    selectedItem = rectangle;
  };

  const onMouseUp = (_event: paper.MouseEvent) => {
    if (selectedItem) selectedItem.selected = false;
    selectedItem = null;
  };

  const onMouseDown = (event: paper.MouseEvent) => {
    const hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: 5,
    };
    const hit = paperScope.project.hitTest(event.point, hitOptions);
    if (!hit) {
      switch (tool) {
        case "Circle":
          drawCircle(event);
          break;
        case "Rectangle":
          drawRectangle(event);
          break;
      }
      transform = "resize";
    } else {
      if (altKey) {
        hit.item.remove();
      } else {
        hit.item.selected = true;
        if (hit.type === "fill") {
          transform = "move";
        } else {
          transform = "resize";
        }
        selectedItem = hit.item;
      }
    }
  };

  const onMouseDrag = (event: paper.MouseEvent) => {
    if (selectedItem) {
      if (transform === "resize") {
        selectedItem.bounds.width += event.delta.x;
        selectedItem.bounds.height += event.delta.y;
      }
      if (transform === "move") {
        selectedItem.bounds.center.x += event.delta.x;
        selectedItem.bounds.center.y += event.delta.y;
      }
    } else {
      console.log("no selected item");
    }
  };

  const onKeyDown = (event: paper.KeyEvent) => {
    if (event.key === "shift") {
      altKey = true;
    }
  };
  const onKeyUp = (event: paper.KeyEvent) => {
    if (event.key === "shift") {
      altKey = false;
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
