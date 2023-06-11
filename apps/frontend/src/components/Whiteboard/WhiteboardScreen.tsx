import { styled } from "@/theme";
import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Stage } from "react-konva";
import useMeasure from "react-use-measure";
import { ToolType, toolItems } from "./Whiteboard";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Rectangle } from "@/views/konva-create";

const Screen = styled("div", {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "block",
  backgroundColor: "$gray500",
  position: "relative",

  "@bp2": {
    height: "70vh",
    borderRadius: "16px",
  },
});

interface Props {
  activeToolType: ToolType | null;
}

interface SquareProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
  stroke: string;
}

const WhiteboardScreen: React.FC<Props> = ({ activeToolType }) => {
  /* Ref for the container to get the actual width and height to apply to the stage konva component */
  const [screenRef, { width, height }] = useMeasure();

  /* Ref to change the cursor when a tool is selected */
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  /* Change the cursor when a different tool is selected */
  React.useEffect(() => {
    if (!wrapperRef.current) return;

    if (!activeToolType) {
      wrapperRef.current.style.cursor = "default";
      return;
    }

    const tool = toolItems[activeToolType];

    if (!tool) return;

    wrapperRef.current.style.cursor = tool.cursorType;
  }, [activeToolType]);

  /* State to detect if the user is drawing a shape */
  const [isDrawing, setIsDrawing] = React.useState(false);

  /* State to get the values of the shape that the user is drawing */
  const [drawingShape, setDrawingShape] = React.useState<SquareProps | null>(
    null
  );

  /* Map with all the drawn shapes */
  const [shapes, setShapes] = React.useState<Record<string, SquareProps>>({});

  /* onMouseDown handler for the stage */
  const onMouseDownHandler = (event: KonvaEventObject<MouseEvent>) => {
    /* Get the stage and return if it's null */
    const stage = event.target.getStage();
    if (!stage) return;

    /* Detect the selected tool type */
    switch (activeToolType) {
      /* Functionality to create squares */
      case "square": {
        setIsDrawing(true);

        /* Create the new sqaure */
        const newSquare: SquareProps = {
          x: stage.getPointerPosition()?.x ?? 0,
          y: stage.getPointerPosition()?.y ?? 0,
          width: 0,
          height: 0,
          fill: "lightblue",
          stroke: "blue",
          id: nanoid(),
        };

        setDrawingShape(newSquare);

        break;
      }

      default: {
        break;
      }
    }
  };

  /* onMouseMove handler for the stage */
  const onMouseMoveHandler = (event: KonvaEventObject<MouseEvent>) => {
    /* Get the stage and return if it's null */
    const stage = event.target.getStage();
    if (!stage) return;

    /* Detect the selected tool type */
    switch (activeToolType) {
      /* Functionality to resize the drawing squares */
      case "square": {
        if (!isDrawing) return;

        /* Check if exists any drawing shape */
        if (!drawingShape) return;

        /* Get the mouse pointer cords */
        const pointerCords = stage.getPointerPosition();

        if (!pointerCords) return;

        const newWidth = pointerCords.x - drawingShape.x;
        const newHeight = pointerCords.y - drawingShape.y;

        const squareToDraw: SquareProps = {
          ...drawingShape,
          width: newWidth,
          height: newHeight,
        };

        setShapes((prev) => ({ ...prev, [squareToDraw.id]: squareToDraw }));

        break;
      }

      default: {
        break;
      }
    }
  };

  /* onMouseMove handler for the stage */
  const onMouseUpHandler = (event: KonvaEventObject<MouseEvent>) => {
    /* Detect the selected tool type */
    switch (activeToolType) {
      /* Functionality to resize the drawing squares */
      case "square": {
        setIsDrawing(false);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <Screen ref={screenRef}>
      <div
        ref={wrapperRef}
        style={{
          height: "inherit",
          width: "inherit",
          borderRadius: "inherit",
        }}
      >
        <Stage
          width={width}
          height={height}
          style={{
            position: "absolute",
            borderRadius: "inherit",
          }}
          onMouseDown={onMouseDownHandler}
          onMouseMove={onMouseMoveHandler}
          onMouseUp={onMouseUpHandler}
        >
          <Layer>
            {Object.values(shapes).map((item) => (
              <Rectangle
                key={item.id}
                shapeProps={item}
                isSelected={false}
                onSelect={() => {
                  // setSelectedId(shape.id);
                }}
                onChange={(newAttrs: any) => {
                  // setShapes((prev) => ({ ...prev, [shape.id]: newAttrs }));
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </Screen>
  );
};

export default WhiteboardScreen;
