import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/SubmitLoader'

import DefaultImge from '../../assets/default.jpg';
import { fetchMovieDetail, setLoader } from '../../reducers/MovieDetailReducer';
import './style.scss'

function MovieDetail() {
  const dispatch = useDispatch();
  const config = useSelector(state => state.config.config);
  const { movieDetail: movie, loading } = useSelector(state => state.movieDetail);

  const params = useParams();
  const getMovieData = useCallback(() => {
    dispatch(setLoader(true));
    const url = `https://api.themoviedb.org/3/movie/${params.id}`;
    dispatch(fetchMovieDetail(url));
  }, [params.id, dispatch]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  return (
    <div className='movie-detail'>
      {movie && !loading ? (
        <>
          <figure>
            {movie.poster_path ? (
              <img
                src={`${config?.images?.base_url}/w185/${movie.poster_path}`}
                alt='movie-poster'
              />
            ) : (
              <img src={DefaultImge} alt='no-poster-found' />
            )}
          </figure>
          <div className='movie-desc'>
            <h2>{movie.title}</h2>
            {movie.tagline && <p>{movie.tagline}</p>}
            <span>
              {movie.release_date ? (
                movie.release_date.slice(0, 4)
              ) : (
                <em className='muted'>No release date found</em>
              )}
            </span>
            {' | '}
            <span>
              {movie.runtime ? (
                <span>{movie.runtime} minutes</span>
              ) : (
                <em className='muted'>No runtime information found</em>
              )}
            </span>
            <p className='muted'>
              {movie.overview ? movie.overview : <em>No plot summary found</em>}
            </p>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MovieDetail;
