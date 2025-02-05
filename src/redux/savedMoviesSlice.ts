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
  savedMovies: JSON.parse(localStorage.getItem("savedMovies") || "[]"), // localStorage'dan yükle
};

const savedMoviesSlice = createSlice({
  name: "savedMovies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.savedMovies.push(action.payload);
      // Yeni filmi localStorage'a kaydet
      localStorage.setItem("savedMovies", JSON.stringify(state.savedMovies));
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.savedMovies = state.savedMovies.filter(
        (movie) => movie.id !== action.payload
      );
      // Yeni durumu localStorage'a kaydet
      localStorage.setItem("savedMovies", JSON.stringify(state.savedMovies));
    },
  },
});

export const { addMovie, removeMovie } = savedMoviesSlice.actions;
export default savedMoviesSlice.reducer;
