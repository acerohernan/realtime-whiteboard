import { styled } from "@/theme";
import { Divider } from "../BottomMenu/styles";
import {
  MousePointer2,
  PointerIcon,
  Redo2Icon,
  SparklesIcon,
  SplineIcon,
  SquareIcon,
  TypeIcon,
  Undo2Icon,
} from "lucide-react";
import { Tooltip } from "../Tooltip";
import React from "react";

const Wrapper = styled("div", {
  backgroundColor: "#F8F6F4",
  width: "100%",
  height: "35vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "24px",

  "@bp2": {
    height: "100vh",
    padding: "0px 24px",
  },
});

const Screen = styled("div", {
  width: "100%",
  height: "100%",
  display: "block",
  backgroundColor: "$gray500",
  position: "relative",

  "@bp2": {
    height: "70vh",
    borderRadius: "16px",
  },
});

const Canvas = styled("canvas", {
  borderRadius: "inherit",
  border: "1px solid red",
});

const Image = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const ToolContainer = styled("div", {
  display: "none",
  width: "60px",
  boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
  backgroundColor: "white",
  borderRadius: "8px",

  "@bp2": {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "8px",
  },
});

const ToolButton = styled("button", {
  padding: "12px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid White",
  transition: "0.2s all ease-in-out",

  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.04)",
  },

  variants: {
    state: {
      active: {
        borderColor: "black",
      },
    },
  },
});

const CursorDot = styled("div", {
  pointerEvents: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  opacity: 1,
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
  width: "8px",
  height: "8px",
  backgroundColor: "Red",
});

type ToolItem = {
  icon: React.ReactNode;
  label: string;
  cursorType: string;
};

const toolItems: Record<string, ToolItem> = {
  Pointer: {
    label: "Pointer",
    icon: <PointerIcon />,
    cursorType: "pointer",
  },
  Select: {
    label: "Select",
    icon: <MousePointer2 />,
    cursorType: "default",
  },
  Wire: {
    label: "Wire",
    icon: <SplineIcon />,
    cursorType: "crosshair",
  },
  Shape: {
    label: "Shape",
    icon: <SquareIcon />,
    cursorType: "crosshair",
  },
  Text: {
    label: "Text",
    icon: <TypeIcon />,
    cursorType: "crosshair",
  },
  "Clean all": {
    label: "Clean all",
    icon: <SparklesIcon />,
    cursorType: "default",
  },
};

const Whiteboard = () => {
  const [toolPressed, setToolPressed] = React.useState<string>("");

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
    canvas.width = 500;
    canvas.height = 500;

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

  /* Change the cursor when a different tool is selected */
  React.useEffect(() => {
    if (!canvasRef.current) return;

    if (!toolPressed) {
      canvasRef.current.style.cursor = "default";
      return;
    }

    const tool = toolItems[toolPressed];

    if (!tool) return;

    canvasRef.current.style.cursor = tool.cursorType;
  }, [toolPressed]);

  const handleSelectTool = (toolName: string) => () => {
    if (toolPressed === toolName) return setToolPressed("");

    setToolPressed(toolName);
  };

  return (
    <Wrapper>
      <ToolContainer>
        {Object.values(toolItems).map((item) => (
          <Tooltip content={item.label} key={item.label}>
            <ToolButton
              state={toolPressed === item.label ? "active" : undefined}
              onClick={handleSelectTool(item.label)}
            >
              {item.icon}
            </ToolButton>
          </Tooltip>
        ))}
        <Divider />
        <Tooltip content="Undo">
          <ToolButton>
            <Undo2Icon />
          </ToolButton>
        </Tooltip>
        <Tooltip content="Redo">
          <ToolButton>
            <Redo2Icon />
          </ToolButton>
        </Tooltip>
      </ToolContainer>
      <Screen>
        <Canvas
          ref={canvasRef}
          onMouseDown={startDrawingRectangle}
          onMouseMove={drawRectangle}
          onMouseUp={stopDrawingRectangle}
          onMouseLeave={stopDrawingRectangle}
        />
        {/* <Image src="/images/world-map.png" /> */}
      </Screen>
      <span>Is Drawing?: {isDrawing ? "Yes" : "No"}</span>
    </Wrapper>
  );
};

export default Whiteboard;
