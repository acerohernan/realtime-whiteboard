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
  backgroundColor: "$gray500",
  position: "relative",

  "@bp2": {
    height: "70vh",
    borderRadius: "16px",
  },
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

  const canvasRef = React.useRef<HTMLDivElement>(null);

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
          <Tooltip content={item.label}>
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
      <Screen ref={canvasRef}>
        <Image src="/images/world-map.png" />
      </Screen>
    </Wrapper>
  );
};

export default Whiteboard;
