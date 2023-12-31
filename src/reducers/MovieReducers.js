import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchMovies = createAsyncThunk(
  'fetchMovies',
  async (url, thunkAPI) => {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_READ_TOKEN}`,
      },
    });
    return response.data;
  }
);

export const movieSlice = createSlice({
  name: 'movieList',
  initialState: {
    movieList: [],
    pageNo: 0,
    loading: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.pageNo = action.payload;
    },
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.results)) {
        if (current(state).pageNo > 1) {
          state.movieList.push(...action.payload.results);
        } else {
          state.movieList = [...action.payload.results];
        }
      }
      state.pageNo = action.payload.page;
      state.loading = false;
    });
  },
});

export const { setPage, setLoader } = movieSlice.actions;

export default movieSlice.reducer;
