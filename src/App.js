import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loader from './components/SubmitLoader'
import MovieList from './components/MovieList';
import './App.scss';
import MovieDetail from './pages/MovieDetail';
import Header from './components/Header';
import { fetchMovies, setPage, setLoader } from './reducers/MovieReducers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfig } from './reducers/configReducer';

function App() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const list = useSelector(state => state.movieList.movieList);
  const page = useSelector(state => state.movieList.pageNo);
  const isLoading = useSelector(state => state.movieList.loading);
  // const isLoading = useSelector(state => state.movieList.loading);

  async function getData(currentPage = page) {
    dispatch(setLoader(true));
    let url = '';
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${
        page + 1
      }`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?page=${
        page + 1
      }`;
    }
    dispatch(fetchMovies(url));
  }

  async function getSearchData() {
    dispatch(setLoader(true));
    let url = '';
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${
        1
      }`;
      dispatch(fetchMovies(url));
    } else {
      getData()
    }
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getData(page+1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    getData();
    dispatch(fetchConfig())
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSearchData();
    // eslint-disable-next-line
  }, [search]);

  const handleFocus = () => {
    if (search === '') {
      dispatch(setPage(0));
    }
  };

  return (
    <BrowserRouter>
      <div className='App'>
        {isLoading && <Loader />}
        <Header
          search={search}
          setSearch={setSearch}
          handleFocus={handleFocus}
        />
        <Routes>
          <Route
            path='/'
            element={<MovieList movies={list} />}
          />
          <Route path='/movies/:id' element={<MovieDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
