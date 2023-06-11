import { Whiteboard } from "@/components/Whiteboard";
import { styled } from "@/theme";
import React from "react";

const Wrapper = styled("div", {
  width: "100%",
  height: "100vh",
  /*   display: "flex",
  alignItems: "center",
  justifyContent: "center", */
});

const Canvas = styled("canvas", {
  border: "1px solid red",
  boxSizing: "border-box",
});

const WhiteboardView = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const contextRef = React.useRef<any>(null);

  const [isDrawing, setIsDrawing] = React.useState(false);

  const canvasOffSetX = React.useRef<any>(null);
  const canvasOffSetY = React.useRef<any>(null);
  const startX = React.useRef<any>(null);
  const startY = React.useRef<any>(null);

  /* Canvas drawing */
  React.useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 800;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;

    const canvasOffSet = canvas.getBoundingClientRect();

    canvasOffSetX.current = canvasOffSet.top;
    canvasOffSetY.current = canvasOffSet.left;
  }, []);

  const startDrawingRectangle: React.MouseEventHandler<HTMLCanvasElement> = ({
    nativeEvent,
  }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    startX.current = nativeEvent.clientX - canvasOffSetX.current;
    startY.current = nativeEvent.clientY - canvasOffSetY.current;

    setIsDrawing(true);
  };

  const drawRectangle: React.MouseEventHandler<HTMLCanvasElement> = ({
    nativeEvent,
  }) => {
    if (!isDrawing) return;

    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
    const newMouseY = nativeEvent.clientY - canvasOffSetX.current;

    const rectWidth = newMouseX - startX.current;
    const rectHeight = newMouseY - startY.current;

    if (!canvasRef.current) return;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    contextRef.current.strokeRect(
      startX.current,
      startY.current,
      rectWidth,
      rectHeight
    );
  };

  const stopDrawingRectangle = () => {
    setIsDrawing(false);
  };

  return (
    <Wrapper>
      <Canvas
        ref={canvasRef}
        onMouseDown={startDrawingRectangle}
        onMouseMove={drawRectangle}
        onMouseUp={stopDrawingRectangle}
        onMouseLeave={stopDrawingRectangle}
      />
    </Wrapper>
  );
};

export default WhiteboardView;
