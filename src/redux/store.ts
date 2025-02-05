import { configureStore } from "@reduxjs/toolkit";
import savedMoviesReducer from "./savedMoviesSlice";

export const store = configureStore({
  reducer: {
    savedMovies: savedMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
