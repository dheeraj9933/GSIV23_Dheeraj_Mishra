import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchMovieDetail = createAsyncThunk(
  'fetchMovieDetail',
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
  name: 'movieDetail',
  initialState: {
    movieDetail: null,
    loading: false,
  },
  reducers : {
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.movieDetail = action.payload;
      state.loading = false;
    });
  },
});

export const { setLoader } = movieSlice.actions;

export default movieSlice.reducer;
