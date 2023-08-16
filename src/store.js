import { configureStore } from '@reduxjs/toolkit'

import movieSlice from './reducers/MovieReducers'
import configSlice from './reducers/configReducer'
import movieDetailSlice from './reducers/MovieDetailReducer'

export default configureStore({
  reducer: {
    movieList: movieSlice,
    config: configSlice,
    movieDetail: movieDetailSlice
  },
})