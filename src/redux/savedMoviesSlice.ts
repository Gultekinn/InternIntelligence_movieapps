import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface SavedMoviesState {
  savedMovies: Movie[];
}

const initialState: SavedMoviesState = {
  savedMovies: [], 
};

const savedMoviesSlice = createSlice({
  name: "savedMovies",
  initialState,
  reducers: {
    setSavedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.savedMovies = action.payload;
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.savedMovies.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("savedMovies", JSON.stringify(state.savedMovies));
      }
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.savedMovies = state.savedMovies.filter(
        (movie) => movie.id !== action.payload
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("savedMovies", JSON.stringify(state.savedMovies));
      }
    },
  },
});

export const loadSavedMovies = () => (dispatch: any) => {
  if (typeof window !== "undefined") {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies") || "[]");
    dispatch(setSavedMovies(savedMovies));
  }
};

export const { addMovie, removeMovie, setSavedMovies } = savedMoviesSlice.actions;
export default savedMoviesSlice.reducer;
