import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchConfig = createAsyncThunk(
  'fetchConfig',
  async thunkAPI => {
    const url = 'https://api.themoviedb.org/3/configuration';
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_READ_TOKEN}`,
      },
    });
    return response.data;
  }
);

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    config: null,
  },
  extraReducers: builder => {
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      state.config = action.payload;
    });
  },
});

export default configSlice.reducer;
