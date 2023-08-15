import { Link } from 'react-router-dom';

import DefaultImge from '../../assets/default.jpg'

function MovieList({ movies, config }) {
  return (
    <ul className='movie-list'>
      {Array.isArray(movies) && movies.length ? movies.map((movie, index) => {
        return (
          <li className='movie-item' key={movie.id}>
            <Link to={`movies/${movie.id}`}>
              <figure>
                {movie.poster_path ? (
                  <img
                    src={`${config?.images?.base_url}/w342/${movie.poster_path}`}
                    alt=''
                  />
                ) : (
                  <img src={DefaultImge} />
                )}
              </figure>
              <div className='desc'>
                <div className='top'>
                  <h2>{movie.title}</h2>
                  <span>{movie.vote_average ? movie.vote_average : <span className='muted'>N/A</span>}</span>
                </div>
                <p>{movie.overview ? movie.overview : <em className='muted'>No description found</em>}</p>
              </div>
            </Link>
          </li>
        );
      }) : 'No movies found'}
    </ul>
  );
}

export default MovieList;
