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
import WhiteboardScreen from "./WhiteboardScreen";

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

export type ToolItem = {
  icon: React.ReactNode;
  label: string;
  cursorType: string;
  type: ToolType;
};

export type ToolType =
  | "pointer"
  | "select"
  | "line"
  | "square"
  | "text"
  | "eraser";

export const toolItems: Record<ToolType, ToolItem> = {
  pointer: {
    label: "Pointer",
    icon: <PointerIcon />,
    cursorType: "pointer",
    type: "pointer",
  },
  select: {
    label: "Select",
    icon: <MousePointer2 />,
    cursorType: "default",
    type: "select",
  },
  line: {
    label: "Wire",
    icon: <SplineIcon />,
    cursorType: "crosshair",
    type: "line",
  },
  square: {
    label: "Shape",
    icon: <SquareIcon />,
    cursorType: "crosshair",
    type: "square",
  },
  text: {
    label: "Text",
    icon: <TypeIcon />,
    cursorType: "crosshair",
    type: "text",
  },
  eraser: {
    label: "Clean all",
    icon: <SparklesIcon />,
    cursorType: "default",
    type: "eraser",
  },
};

const Whiteboard = () => {
  const [toolPressed, setToolPressed] = React.useState<ToolType | null>(null);

  const handleSelectTool = (toolType: ToolType) => () => {
    if (toolPressed === toolType) return setToolPressed(null);

    setToolPressed(toolType);
  };

  return (
    <Wrapper>
      <ToolContainer>
        {Object.values(toolItems).map((item) => (
          <Tooltip content={item.label} key={item.label}>
            <ToolButton
              state={toolPressed === item.type ? "active" : undefined}
              onClick={handleSelectTool(item.type)}
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
      <WhiteboardScreen activeToolType={toolPressed} />
    </Wrapper>
  );
};

export default Whiteboard;
