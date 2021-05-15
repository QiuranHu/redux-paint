import { RootState } from "./types";

// This selector returns an array of points of the current stroke.

export const strokesSelector = (state: RootState) => state.strokes;
