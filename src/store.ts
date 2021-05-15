import logger from "redux-logger";
import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import historyIndex from "./modules/historyIndex/slice";
import currentStroke from "./modules/currentStroke/reducer";
import strokes from "./modules/strokes/slice";
import { modalVisible } from "./modules/modals/slice";
import { RootState } from "./types";
import { projectsList } from "./modules/projectsList/slice";

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
  reducer: {
    historyIndex,
    currentStroke,
    modalVisible,
    strokes,
    projectsList,
  },
  middleware,
});
