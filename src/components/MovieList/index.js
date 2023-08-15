function MovieList({ movies, config }) {
  return (
    <ul className='movie-list'>
      {movies.map((movie, index) => {
        return (
          <li className='movie-item' key={movie.id}>
            <figure>
              <img
                src={`${config?.images?.base_url}/w185/${movie.poster_path}`}
                alt=''
              />
            </figure>
            <h2>{movie.title}</h2>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
