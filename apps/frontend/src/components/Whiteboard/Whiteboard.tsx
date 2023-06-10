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

  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
});

const Whiteboard = () => {
  return (
    <Wrapper>
      <ToolContainer>
        <Tooltip content="Pointer">
          <ToolButton>
            <PointerIcon />
          </ToolButton>
        </Tooltip>
        <Tooltip content="Select">
          <ToolButton>
            <MousePointer2 />
          </ToolButton>
        </Tooltip>
        <Tooltip content="Wire">
          <ToolButton>
            <SplineIcon />
          </ToolButton>
        </Tooltip>
        <Tooltip content="Shape">
          <ToolButton>
            <SquareIcon />
          </ToolButton>
        </Tooltip>
        <Tooltip content="Text">
          <ToolButton>
            <TypeIcon />
          </ToolButton>
        </Tooltip>

        <Tooltip content="Clean all">
          <ToolButton>
            <SparklesIcon />
          </ToolButton>
        </Tooltip>
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
        <Image src="/images/world-map.png" />
      </Screen>
    </Wrapper>
  );
};

export default Whiteboard;
