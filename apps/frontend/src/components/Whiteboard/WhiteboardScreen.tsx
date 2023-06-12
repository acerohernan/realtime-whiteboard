import { styled } from "@/theme";
import { KonvaEventObject, NodeConfig } from "konva/lib/Node";
import { Layer, Rect, Stage, Transformer, Image } from "react-konva";
import useMeasure from "react-use-measure";
import { ToolType, toolItems } from "./Whiteboard";
import React from "react";
import { nanoid } from "nanoid";
import useImage from "use-image";

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

interface RectProps {
  shapeProps: NodeConfig;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttributes: NodeConfig) => void;
  draggable?: boolean;
}

export const Rectangle: React.FC<RectProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  draggable,
}) => {
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        strokeWidth={4}
        stroke={"red"}
        fill="transparent"
        draggable={draggable}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

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

  /* State to select and deselect shape */
  const [selectedShapeId, setSelectedShapeId] = React.useState<string | null>(
    null
  );

  /* Image to show in the canvas */
  const [image] = useImage("/images/world-map.png");

  /* onMouseDown handler for the stage */
  const onMouseDownHandler = (event: KonvaEventObject<MouseEvent>) => {
    /* Get the stage and return if it's null */
    const stage = event.target.getStage();
    if (!stage) return;

    /* If the user makes a click in the stage, the selected shape must be deselected  */
    if (stage === event.target && setSelectedShapeId) {
      setSelectedShapeId(null);
    }

    /* Detect the selected tool type */
    switch (activeToolType) {
      /* Functionaly to select shapes */
      case "select": {
        break;
      }

      /* Functionality to create squares */
      case "square": {
        setSelectedShapeId(null);
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

  /* onKeyDown handler */
  const onKeyDownHandler = (event: KeyboardEvent) => {
    if (selectedShapeId && event.key === "Backspace") {
      setShapes((prev) => {
        delete prev[selectedShapeId];

        return prev;
      });
      setSelectedShapeId(null);
    }
  };

  /* Delete the selected shape if we pressed Backspace */
  React.useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);

    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [selectedShapeId]);

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
            <Image
              image={image}
              onClick={() => {
                if (selectedShapeId) {
                  setSelectedShapeId(null);
                }
              }}
              width={width}
              height={height}
            />
            {Object.values(shapes).map((item) => (
              <Rectangle
                key={item.id}
                draggable={item.id === selectedShapeId}
                shapeProps={item}
                isSelected={item.id === selectedShapeId}
                onSelect={() => {
                  if (activeToolType !== "select") return;

                  setSelectedShapeId(item.id);
                }}
                onChange={(newAttrs: NodeConfig) => {
                  setShapes((prev) => ({
                    ...prev,
                    [item.id]: newAttrs as SquareProps,
                  }));
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
