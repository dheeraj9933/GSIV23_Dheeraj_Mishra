import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchMovies = createAsyncThunk(
  'users/fetchByIdStatus',
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
    loading: false
  },
  reducers: {
    setPage: (state, action) => {
      console.log('setpage',action);
      state.pageNo = action.payload;
    },
    setLoader: (state, action) => {
      console.log('setloader',action);
      state.loading = action.payload
    }
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      // Add user to the state array
      //   state.movieList = action.payload;
      console.log(current(state));
      console.log('action', action);
      if (current(state).pageNo <= 1) {
        console.log('in if');
        state.movieList = [...action.payload.results];
      } else {
        console.log('in else');
        state.movieList.push(...action.payload.results);
      }
      state.pageNo = action.payload.page
      state.loading = false
    });
  },
});

// Action creators are generated for each case reducer function
export const { setPage, setLoader } = movieSlice.actions;

export default movieSlice.reducer;
