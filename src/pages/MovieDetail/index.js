import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DefaultImge from '../../assets/default.jpg';

function MovieDetail() {
  const [movie, setMovie] = useState({});
  const [config, setConfig] = useState({});
  const getConfig = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(res => setConfig(res.data));
  };
  const params = useParams();
  const getMovieData = async () => {
    const url = `https://api.themoviedb.org/3/movie/${params.id}`;
    const req = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_READ_TOKEN}`,
      },
    });
    setMovie(req.data);
  };

  console.log(movie);
  useEffect(() => {
    getConfig();
    getMovieData();
  }, []);
  return (
    <div className='movie-detail'>
      <figure>
        {movie.poster_path ? (
          <img
            src={`${config?.images?.base_url}/w185/${movie.poster_path}`}
            alt=''
          />
        ) : (
          <img src={DefaultImge} />
        )}
      </figure>
      <div className='movie-desc'>
        <h2>{movie.title}</h2>
        {movie.tagline && <p>{movie.tagline}</p>}
        <span>
          {movie.release_date ? (
            movie.release_date.slice(0,4)
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
    </div>
  );
}

export default MovieDetail;
