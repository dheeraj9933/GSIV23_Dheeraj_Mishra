import { configureStore } from '@reduxjs/toolkit'

import movieSlice from './reducers/MovieReducers'

export default configureStore({
  reducer: {
    movieList: movieSlice,
  },
})