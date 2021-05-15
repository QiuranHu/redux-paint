import { Point } from "./types";

export const drawStroke = (
  context: CanvasRenderingContext2D,
  points: Point[],
  color: string
) => {
  if (!points.length) {
    return;
  }
  context.strokeStyle = color;
  // We create a separate path for each stroke so that they can all have different colors.ß
  context.beginPath();
  // We move to the first point in the array using the moveTo method.
  context.moveTo(points[0].x, points[0].y);
  // We go throught the list of points and connect them with the lines using the lineTo method.
  points.forEach((point) => {
    // This method updates the current path but doesn't render anything.
    context.lineTo(point.x, point.y);
    // The actual drawing happens when we call the stroke method.
    context.stroke();
  });
  // After we finish drawing the storke we need to call closePath method.
  context.closePath();
};

export const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

export const getCanvasImage = (
  canvas: HTMLCanvasElement | null
): Promise<null | Blob> => {
  return new Promise((resolve, reject) => {
    if (!canvas) {
      return reject(null);
    }
    canvas.toBlob(resolve);
  });
};
