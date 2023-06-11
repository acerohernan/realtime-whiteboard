import { KonvaEventObject } from "konva/lib/Node";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }: any) => {
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
        strokeWidth={2}
        stroke={"red"}
        draggable
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

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "transparent",
    id: "rect2",
  },
  {
    x: 250,
    y: 250,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect3",
  },
];

type RectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
  stroke: string;
};

const KonvaCreateView = () => {
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  const [newShape, setNewShape] = React.useState<RectProps | null>(null);
  const [shapes, setShapes] = React.useState<Record<string, RectProps>>({});

  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const mouseDownHandler = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();

    if (!stage) return;

    if (selectedId) {
      if (stage === event.target) {
        setSelectedId(null);
      }
      return;
    }

    setIsDrawing(true);

    const newRect: RectProps = {
      x: stage.getPointerPosition()?.x ?? 0,
      y: stage.getPointerPosition()?.y ?? 0,
      width: 0,
      height: 0,
      fill: "lightblue",
      stroke: "blue",
      id: nanoid(),
    };

    setNewShape(newRect);
  };

  const mouseUpHandler = (event: KonvaEventObject<MouseEvent>) => {
    setIsDrawing(false);
  };

  const mouseMoveHandler = (event: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = event?.target.getStage();

    if (!stage) return;

    if (!newShape) return;

    const stageCords = stage.getPointerPosition();

    if (!stageCords) return;

    const newWidth = stageCords.x - newShape.x;
    const newHeight = stageCords.y - newShape.y;

    const rectToDraw: RectProps = {
      ...newShape,
      width: newWidth,
      height: newHeight,
    };

    setShapes((prev) => ({ ...prev, [newShape.id]: rectToDraw }));
  };

  const onKeyDownHandler = (event: KeyboardEvent) => {
    if (selectedId && event.key === "Backspace") {
      setShapes((prev) => {
        delete prev[selectedId];

        return prev;
      });
      setSelectedId(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);

    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [selectedId]);

  return (
    <div style={{ padding: "8px" }}>
      <Stage
        width={window.innerWidth}
        height={500}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        style={{
          cursor: "pointer",
          borderRadius: "16px",
          backgroundColor: "#eeeeee",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Layer clearBeforeDraw={true}>
          {Object.values(shapes).map((shape, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={shape}
                isSelected={shape.id === selectedId}
                onSelect={() => {
                  setSelectedId(shape.id);
                }}
                onChange={(newAttrs: any) => {
                  setShapes((prev) => ({ ...prev, [shape.id]: newAttrs }));
                }}
              />
            );
          })}
        </Layer>
      </Stage>
      <button
        style={{
          border: "1px solid red",
          padding: "4px",
          borderRadius: "16px",
          marginTop: "10px",
        }}
        onClick={() => setShapes({})}
      >
        Clear canvas
      </button>
    </div>
  );
};

export default KonvaCreateView;
