import { ModalState } from "./modules/modals/slice";

export type RootState = {
  currentStroke: Stroke; // An array of points corresponding to the stroke that is currently being drawn.
  strokes: Stroke[]; // An array of already drawn strokes.
  historyIndex: number; // A number indicating how many of the strokes we want to undo.
  modalVisible: ModalState;
  projectsList: {
    error: string;
    pending: boolean;
    projects: Project[];
  };
};

export type Stroke = {
  points: Point[]; // Each point is an object that holds the x and y coordinates.
  color: string;
};

export type Point = {
  x: number;
  y: number;
};

export type Project = {
  image: string;
  name: string;
  id: string;
};
