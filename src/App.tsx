import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useCanvas } from "./CanvasContext";
import { clearCanvas, drawStroke } from "./canvasUtils";
import { ColorPanel } from "./ColorPanel";
import { EditPanel } from "./EditPanel";
import { ModalLayer } from "./ModalLayer";
import { beginStroke, updateStroke } from "./modules/currentStroke/reducer";
import { currentStrokeSelector } from "./modules/currentStroke/selectors";
import { historyIndexSelector } from "./modules/historyIndex/selectors";
import { endStroke } from "./modules/shartedActions";
import { strokesSelector } from "./selectors";
import { FilePanel } from "./shared/FilePanel";

// In this component, we will subscribe to the store changes and draw on the canvas each time the state is updated.
function App() {
  // Now our compoennt will be re-rendered every time the currentStroke gets updated.
  const currentStroke = useSelector(currentStrokeSelector);
  const historyIndex = useSelector(historyIndexSelector);
  const strokes = useSelector(strokesSelector);
  const dispatch = useDispatch();
  const canvasRef = useCanvas();
  // Drawing is started if there is at least one point in the current stroke points array.
  const isDrawing = !!currentStroke.points.length;

  // To draw on the canvas we need to get the canvas drawing context.
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") };
  };

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) {
      return;
    }
    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    );
  }, [currentStroke]);

  // Every time the historyIndex gets updated we clear the screen and then draw only the strokes
  // that weren't undone.
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!context || !canvas) {
      return;
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas);
      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
  }, [historyIndex, strokes]);

  // Every time the user presses, moves, or releases the mouse, we'll dispatch an action(BEGIN_STROKE).
  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({ x: offsetX, y: offsetY }));
  };
  const endDrawing = () => {
    // The endDrawing function will also trigger when the mouse leaves the canvas area.
    // This is why we check the isDrawing flag to dispatch the endStroke action only if
    // we were drawing the stroke.
    if (isDrawing) {
      dispatch(endStroke({ historyIndex, stroke: currentStroke }));
    }
  };
  // We will dispatch a MOUSE_MOVE action inside the draw callback.
  // draw function handles mouse move event.
  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke({ x: offsetX, y: offsetY }));
  };

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <EditPanel />
      <ColorPanel />
      <FilePanel />
      <ModalLayer />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        width={400}
        height={400}
      />
    </div>
  );
}

export default App;
