import { KonvaEventObject } from "konva/lib/Node";
import { KonvaNodeEvent } from "konva/lib/types";
import React from "react";
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

const KonvaView = () => {
  const [rectangles, setRectangles] =
    React.useState<Array<any>>(initialRectangles);
  const [selectedId, setSelectedId] = React.useState(null);

  const checkDeselect = (e: KonvaEventObject<TouchEvent | MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();

    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  return (
    <div style={{ padding: "8px" }}>
      <Stage
        width={window.innerWidth}
        height={500}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        listening={true}
        style={{
          cursor: "pointer",
          borderRadius: "16px",
          backgroundColor: "#eeeeee",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Layer>
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  setSelectedId(rect.id);
                }}
                onChange={(newAttrs: any) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs as never;
                  setRectangles(rects);
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
        }}
      >
        Add image to the canvas
      </button>
    </div>
  );
};

export default KonvaView;
