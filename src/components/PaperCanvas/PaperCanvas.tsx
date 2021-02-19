import React from "react";
import "./PaperCanvas.scss";

type Props = {
  height: number;
  className: string;
};

const PaperCanvas = React.forwardRef<HTMLCanvasElement, Props>((props, ref) => {
  const { className, height } = props;

  return (
    <canvas ref={ref} height={height} className={`PaperCanvas ${className}`} />
  );
});

export default PaperCanvas;
